"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)();
exports.logger = logger;
logger.level = "debug";
