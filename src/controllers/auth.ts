import { User } from "../models/postgres";
import { validationResult } from "express-validator";
import { auth } from "../ENUM/authEnum";
import { Request, Response } from "express";
import { login, signup } from "../services/authService";
import { logger } from "../config/logger_config";

const authController = {
  signup: async (req: Request, res: Response, next: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: any = new Error(auth.Validation_FAILED);
        error.statusCode = 422;
        error.data = errors.array();
        res.status(401).json({ error: error });
        throw error;
      }
      signup(req, res, next);
    } catch (e) {
      logger.error(e);
      res.status(501).json({ error: e });
    }
  },

  // TODO: give the facility to login with username and username should be unique.
  login: async (
    req: { body: { email: string; username: string; password: string } },
    res: Response,
    next: any
  ) => {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      await login(req, res, email, username, password);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },

  getUser: async (req: Request, res: Response, next) => {
    let id = req.params.userId;
    let user: any = await User.findByPk(id);
    logger.info(user.dataValues);
    res.status(200).json({ user: user.dataValues });
  },
};

export default authController;
