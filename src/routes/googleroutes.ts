import express from "express";
import passport from "passport";
import { Routes, googleAuth } from "../ENUM/authEnum";
import session from "express-session";
import "../controllers/googleAuth";
import { logger } from "../config/logger_config";

const router = express.Router();

router.get(
  Routes.GOOGLE,
  passport.authenticate(googleAuth.GOOGLE, {
    scope: [googleAuth.SCOPE],
    accessType: googleAuth.ACCESS_TYPE,
    prompt: googleAuth.CONSENT,
  })
);

router.get(
  Routes.GOOGLE_CALLBACK,
  passport.authenticate(googleAuth.GOOGLE, {
    failureRedirect: Routes.LOGIN,
  }),
  (req: express.Request, res: express.Response) => {
    res.redirect(Routes.SUCESS);
  }
);

router.get(
  Routes.SUCESS,
  async (req: express.Request, res: express.Response) => {
    logger.info(req.user);
    res.send(req.user);
  }
);

export default router;
