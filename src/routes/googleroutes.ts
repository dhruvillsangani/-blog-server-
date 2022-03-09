import express from "express";
import passport from "passport";
import { Routes, google } from "../ENUM/authEnum";
import session from "express-session";
import "../controllers/googleAuth";
import { logger } from "../config/logger_config";

const router = express.Router();

router.get(
  Routes.GOOGLE,
  passport.authenticate(google.GOOGLE, {
    scope: ["profile"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  Routes.GOOGLE_CALLBACK,
  passport.authenticate(google.GOOGLE, {
    failureRedirect: Routes.LOGIN,
  }),
  (req, res) => {
    res.redirect(Routes.SUCESS);
  }
);

router.get(Routes.SUCESS, async (req, res) => {
  logger.info(req.user);
  res.send(req.user);
});

export default router;
