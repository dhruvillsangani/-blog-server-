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
const passport_1 = __importDefault(require("passport"));
const authEnum_1 = require("../utils/constants/enum/authEnum");
require("../controllers/googleAuth");
const logger_config_1 = require("../config/logger_config");
const router = express_1.default.Router();
router.get(authEnum_1.Routes.GOOGLE, passport_1.default.authenticate(authEnum_1.googleAuth.GOOGLE, {
    scope: [authEnum_1.googleAuth.SCOPE],
    accessType: authEnum_1.googleAuth.ACCESS_TYPE,
    prompt: authEnum_1.googleAuth.CONSENT,
}));
router.get(authEnum_1.Routes.GOOGLE_CALLBACK, passport_1.default.authenticate(authEnum_1.googleAuth.GOOGLE, {
    failureRedirect: authEnum_1.Routes.LOGIN,
}), (req, res) => {
    res.redirect(authEnum_1.Routes.SUCESS);
});
router.get(authEnum_1.Routes.SUCESS, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_config_1.logger.info(req.user);
    res.send(req.user);
}));
exports.default = router;
