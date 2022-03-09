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
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../models/postgres");
const express_validator_1 = require("express-validator");
const authEnum_1 = require("../ENUM/authEnum");
const authService_1 = require("../services/authService");
const logger_config_1 = require("../config/logger_config");
const authController = {
    signup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const error = new Error(authEnum_1.auth.Validation_FAILED);
                error.statusCode = 422;
                error.data = errors.array();
                res.status(401).json({ error: error });
                throw error;
            }
            (0, authService_1.signup)(req, res, next);
        }
        catch (e) {
            logger_config_1.logger.error(e);
            res.status(501).json({ error: e });
        }
    }),
    // TODO: give the facility to login with username and username should be unique.
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            yield (0, authService_1.login)(req, res, email, username, password);
        }
        catch (error) {
            res.status(401).json({ error: error });
        }
    }),
    getUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let id = req.params.userId;
        let user = yield postgres_1.User.findByPk(id);
        logger_config_1.logger.info(user.dataValues);
        res.status(200).json({ user: user.dataValues });
    }),
};
exports.default = authController;
