"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_password = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const password_checking_1 = require("./password_checking");
Object.defineProperty(exports, "user_password", { enumerable: true, get: function () { return password_checking_1.user_password; } });
dotenv.config();
const newLocal = "0";
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.USER_NAMES, process.env.DATABASE_PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: newLocal,
});
exports.sequelize = sequelize;
(0, user_1.init)(sequelize);
(0, password_checking_1.userPassword)(sequelize);
