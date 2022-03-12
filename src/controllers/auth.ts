import { User } from "../models/postgres";
import { validationResult } from "express-validator";
import { auth, status } from "../utils/constants/enum/authEnum";
import { NextFunction, Request, Response } from "express";
import { login, signup } from "../services/authService";
import { logger } from "../config/logger_config";

const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error(auth.Validation_FAILED);
        error.statusCode = status.VALIDATION_ERROR;
        error.data = errors.array();
        res.status(status.VALIDATION_ERROR).json({ error: error });
        throw error;
      }
      signup(req, res, next);
    } catch (e) {
      logger.error(e);
      res.status(status.serverError).json({ error: e });
    }
  },

  // TODO: give the facility to login with username and username should be unique.
  login: async (
    req: { body: { email: string; username: string; password: string } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const email = req.body.email;
      // const username = req.body.username;
      // const password = req.body.password;

      const { email, username, password } = req.body;

      await login(req, res, email, username, password);
    } catch (error) {
      res.status(status.VALIDATION_ERROR).json({ error: error });
    }
  },

  getUser: async (req: Request, res: Response) => {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    logger.info(user);
    res.status(status.success).json(user);
  },
};

export default authController;
