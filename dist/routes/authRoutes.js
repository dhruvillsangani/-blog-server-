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
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const express_validator_1 = require("express-validator");
const postgres_1 = require("../models/postgres");
const authEnum_1 = require("../utils/constants/enum/authEnum");
const authEnum_2 = require("../utils/constants/enum/authEnum");
const router = express_1.default.Router();
router.post(authEnum_1.Routes.SIGNUP, [
    (0, express_validator_1.body)(authEnum_2.Validation.email)
        .isEmail()
        .withMessage(authEnum_2.Validation.EMAIL_NOT_VALID)
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const userDoc = yield postgres_1.User.findAll({
            where: { email: value },
        });
        console.log(userDoc);
        if (userDoc.length != 0) {
            return Promise.reject(authEnum_2.Validation.EMAIL_ALREADY_EXISTS);
        }
    }))
        .normalizeEmail(),
    (0, express_validator_1.body)(authEnum_2.Validation.password)
        .trim()
        .isLength({ min: 5 })
        .notEmpty()
        .withMessage(authEnum_2.Validation.PASSWORD_IS_EMPTY),
    (0, express_validator_1.body)(authEnum_2.Validation.username)
        .trim()
        .not()
        .isEmpty()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = yield postgres_1.User.findAll({
            where: { username: value },
        });
        if (userName.length != 0) {
            return Promise.reject(authEnum_2.Validation.USERNAME_ALREADY_EXISTS);
        }
    }))
        .matches(/^[a-z_]{1}[a-zA-Z]*$/)
        .withMessage(authEnum_2.Validation.USERNAME_CREDENTIALS),
], auth_1.default.signup);
router.post(authEnum_1.Routes.LOGIN, auth_1.default.login);
router.get(authEnum_1.Routes.GET_USER, auth_1.default.getUser);
exports.default = router;
