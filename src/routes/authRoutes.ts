import express from "express";
import authController from "../controllers/auth";
import { body } from "express-validator";
import { User } from "../models/postgres";
import { Routes } from "../ENUM/authEnum";
const router = express.Router();

router.post(
  Routes.SIGNUP,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value: string, { req }: any) => {
        const userDoc = await User.findAll({
          where: { email: value },
        });
        console.log(userDoc);
        if (userDoc.length != 0) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom(async (value: string, { req }: any) => {
        const userName = await User.findAll({
          where: { username: value },
        });
        if (userName.length != 0) {
          return Promise.reject("Username already exists!");
        }
      }),
  ],
  authController.signup
);

router.post(Routes.LOGIN, authController.login);

router.get(Routes.GET_USER, authController.getUser);

export default router;
