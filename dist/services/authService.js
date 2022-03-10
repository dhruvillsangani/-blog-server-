"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const postgres_1 = require("../models/postgres");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authEnum_1 = require("../ENUM/authEnum");
const logger_config_1 = require("../config/logger_config");
let login = (req, res, email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    var pass;
    var userObj;
    if (email) {
        let userEmail = yield postgres_1.User.findOne({
            where: { email: email },
        });
        if (!userEmail) {
            const error = new Error();
            error.message = authEnum_1.auth.EMAIL_NOT_FOUND;
            error.statusCode = authEnum_1.status.status_code;
            logger_config_1.logger.error(error);
            throw error;
        }
        if (userEmail) {
            logger_config_1.logger.info(userEmail);
            userObj = userEmail;
            pass = userEmail.password;
        }
    }
    else if (username) {
        let usernameLogin = yield postgres_1.User.findOne({
            where: { username: username },
        });
        if (!usernameLogin) {
            const error = new Error();
            error.statusCode = authEnum_1.status.status_code;
            error.message = authEnum_1.auth.USERNAME;
            logger_config_1.logger.error(error);
            throw error;
        }
        if (usernameLogin) {
            userObj = usernameLogin;
            pass = usernameLogin.password;
        }
    }
    return yield bcryptjs_1.default
        .compare(password, pass)
        .then((isEqual) => __awaiter(void 0, void 0, void 0, function* () {
        if (!isEqual) {
            let findUserInfo = yield postgres_1.User.findOne({
                where: { id: userObj.id },
            });
            if (findUserInfo.counter !== 4) {
                let updatedCount = yield postgres_1.User.update({ counter: userObj.counter + 1, blocked: false }, { where: { id: userObj.id } });
            }
            if (findUserInfo.counter == 4) {
                logger_config_1.logger.warn(userObj.counter);
                var d1 = new Date();
                var d2 = new Date(d1);
                d2.setMinutes(d1.getMinutes() + 1);
                logger_config_1.logger.warn(d2);
                yield postgres_1.User.update({ blocked: true, blockedAt: d2 }, { where: { id: findUserInfo.id } });
            }
            if (findUserInfo.blockedAt) {
                const error = new Error();
                error.message = `you have to wait till ${userObj.blockedAt}`;
                error.statusCode = authEnum_1.status.status_code;
                throw error;
            }
            const error = new Error();
            error.message = authEnum_1.auth.WRONG_PASSWORD;
            error.statusCode = authEnum_1.status.status_code;
            throw error;
        }
        if (isEqual) {
            // check for the isBlocked status
            const findBlockedStatus = yield postgres_1.User.findOne({
                where: { id: userObj.id },
            });
            if (findBlockedStatus.blocked) {
                if (new Date() >= findBlockedStatus.blockedAt) {
                    yield postgres_1.User.update({ counter: 0, blocked: false, blockedAt: null }, { where: { id: userObj.id } });
                }
                const findCounterStatus = yield postgres_1.User.findOne({
                    where: { id: userObj.id },
                });
                if (findCounterStatus.counter != 0) {
                    const error = new Error();
                    error.message = `you have to wait till ${findBlockedStatus.blockedAt.toLocaleTimeString()}`;
                    error.statusCode = authEnum_1.status.status_code;
                    throw error;
                }
            }
        }
        const token = jsonwebtoken_1.default.sign({
            email: userObj.email,
            userId: userObj.id.toString(),
        }, authEnum_1.auth.JWT_SECRET_MSG, { expiresIn: authEnum_1.auth.EXPIRATION_TIME });
        res.status(authEnum_1.status.success).json({
            token: token,
            userId: userObj.id,
            userName: userObj.firstname,
        });
    }))
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = authEnum_1.status.serverError;
            err.token = authEnum_1.auth.TOKEN_VALIDATION;
            throw err;
        }
        throw err;
    });
});
exports.login = login;
let signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, firstname, lastname, password } = req.body;
    try {
        const hashedPw = yield bcryptjs_1.default.hash(password, 12);
        const user = new postgres_1.User({
            email: email,
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: hashedPw,
        });
        const result = yield user.save();
        res.status(201).json({ message: authEnum_1.auth.USER_CREATED, userId: result.id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = authEnum_1.status.serverError;
        }
        next(err);
    }
});
exports.signup = signup;
