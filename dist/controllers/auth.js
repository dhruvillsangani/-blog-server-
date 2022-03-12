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
const authEnum_1 = require("../utils/constants/enum/authEnum");
const authService_1 = require("../services/authService");
const logger_config_1 = require("../config/logger_config");
const authController = {
    signup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const error = new Error(authEnum_1.auth.Validation_FAILED);
                error.statusCode = authEnum_1.status.VALIDATION_ERROR;
                error.data = errors.array();
                res.status(authEnum_1.status.VALIDATION_ERROR).json({ error: error });
                throw error;
            }
            (0, authService_1.signup)(req, res, next);
        }
        catch (e) {
            logger_config_1.logger.error(e);
            res.status(authEnum_1.status.serverError).json({ error: e });
        }
    }),
    // TODO: give the facility to login with username and username should be unique.
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const email = req.body.email;
            // const username = req.body.username;
            // const password = req.body.password;
            const { email, username, password } = req.body;
            yield (0, authService_1.login)(req, res, email, username, password);
        }
        catch (error) {
            res.status(authEnum_1.status.VALIDATION_ERROR).json({ error: error });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.userId;
        const user = yield postgres_1.User.findByPk(id);
        logger_config_1.logger.info(user);
        res.status(authEnum_1.status.success).json(user);
    }),
};
exports.default = authController;
