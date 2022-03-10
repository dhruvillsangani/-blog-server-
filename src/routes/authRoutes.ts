import express from "express";
import authController from "../controllers/auth";
import { body } from "express-validator";
import { User } from "../models/postgres";
import { Routes } from "../ENUM/authEnum";
import { Validation } from "../ENUM/authEnum";
const router = express.Router();

router.post(
  Routes.SIGNUP,
  [
    body(Validation.email)
      .isEmail()
      .withMessage(Validation.EMAIL_NOT_VALID)
      .custom(async (value: string) => {
        const userDoc = await User.findAll({
          where: { email: value },
        });
        console.log(userDoc);
        if (userDoc.length != 0) {
          return Promise.reject(Validation.EMAIL_ALREADY_EXISTS);
        }
      })
      .normalizeEmail(),
    body(Validation.password)
      .trim()
      .isLength({ min: 5 })
      .notEmpty()
      .withMessage(Validation.PASSWORD_IS_EMPTY),
    body(Validation.username)
      .trim()
      .not()
      .isEmpty()
      .custom(async (value: string) => {
        const userName = await User.findAll({
          where: { username: value },
        });
        if (userName.length != 0) {
          return Promise.reject(Validation.USERNAME_ALREADY_EXISTS);
        }
      })
      .matches(/^[a-z_]{1}[a-zA-Z]*$/)
      .withMessage(Validation.USERNAME_CREDENTIALS),
  ],
  authController.signup
);

router.post(Routes.LOGIN, authController.login);

router.get(Routes.GET_USER, authController.getUser);

export default router;
