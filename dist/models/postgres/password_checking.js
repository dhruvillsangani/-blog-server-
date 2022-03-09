"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPassword = exports.user_password = void 0;
const sequelize_1 = require("sequelize");
class user_password extends sequelize_1.Model {
}
exports.user_password = user_password;
const userPassword = (sequelize) => {
    user_password.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        counter: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        blocked: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true,
        },
        blockedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "userpassword",
        sequelize, // passing the sequelize instance
    });
};
exports.userPassword = userPassword;
