import { User, user_password as userpass } from "../models/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth, status } from "../utils/constants/enum/authEnum";
import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger_config";

export let login = async (
  req: { body: { email: string; username: string; password: string } },
  res: Response,
  email: string,
  username: string,
  password: string
) => {
  var pass: string;
  var userObj: any;

  if (email) {
    let userEmail = await User.findOne({
      where: { email: email },
    });
    if (!userEmail) {
      const error: any = new Error();
      error.message = auth.EMAIL_NOT_FOUND;
      error.statusCode = status.VALIDATION_ERROR;
      logger.error(error);
      throw error;
    }

    if (userEmail) {
      logger.info(userEmail);
      userObj = userEmail;
      pass = userEmail.password;
    }
  } else if (username) {
    let usernameLogin = await User.findOne({
      where: { username: username },
    });
    if (!usernameLogin) {
      const error: any = new Error();
      error.statusCode = status.VALIDATION_ERROR;
      error.message = auth.USERNAME;
      logger.error(error);
      throw error;
    }

    if (usernameLogin) {
      userObj = usernameLogin;
      pass = usernameLogin.password;
    }
  }

  return await bcrypt
    .compare(password, pass)
    .then(async (isEqual: any) => {
      if (!isEqual) {
        let findUserInfo = await User.findOne({
          where: { id: userObj.id },
        });
        if (findUserInfo.counter !== 4) {
          let updatedCount = await User.update(
            { counter: userObj.counter + 1, blocked: false },
            { where: { id: userObj.id } }
          );
        }

        if (findUserInfo.counter == 4) {
          logger.warn(userObj.counter);
          var d1 = new Date();
          var d2 = new Date(d1);
          d2.setMinutes(d1.getMinutes() + 1);
          logger.warn(d2);
          await User.update(
            { blocked: true, blockedAt: d2 },
            { where: { id: findUserInfo.id } }
          );
        }

        if (findUserInfo.blockedAt) {
          const error: any = new Error();
          error.message = `you have to wait till ${userObj.blockedAt}`;
          error.statusCode = status.VALIDATION_ERROR;
          throw error;
        }

        const error: any = new Error();
        error.message = auth.WRONG_PASSWORD;
        error.statusCode = status.VALIDATION_ERROR;
        throw error;
      }

      if (isEqual) {
        // check for the isBlocked status
        const findBlockedStatus = await User.findOne({
          where: { id: userObj.id },
        });

        if (findBlockedStatus.blocked) {
          if (new Date() >= findBlockedStatus.blockedAt) {
            await User.update(
              { counter: 0, blocked: false, blockedAt: null },
              { where: { id: userObj.id } }
            );
          }

          const findCounterStatus = await User.findOne({
            where: { id: userObj.id },
          });
          if (findCounterStatus.counter != 0) {
            const error: any = new Error();
            error.message = `you have to wait till ${findBlockedStatus.blockedAt.toLocaleTimeString()}`;
            error.statusCode = status.VALIDATION_ERROR;
            throw error;
          }
        }
      }

      const token = jwt.sign(
        {
          email: userObj.email,
          userId: userObj.id.toString(),
        },
        auth.JWT_SECRET_MSG,
        { expiresIn: auth.EXPIRATION_TIME }
      );
      res.status(status.success).json({
        token: token,
        userId: userObj.id,
        userName: userObj.firstname,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = status.serverError;
        err.token = auth.TOKEN_VALIDATION;
        throw err;
      }

      throw err;
    });
};

export let signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, firstname, lastname, password } = req.body;
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: hashedPw,
    });
    const result = await user.save();

    res
      .status(status.success)
      .json({ message: auth.USER_CREATED, userId: result.id });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = status.serverError;
    }
    next(err);
  }
};
