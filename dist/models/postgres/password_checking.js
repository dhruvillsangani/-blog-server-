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
        key: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "mongodbcredentials",
        sequelize, // passing the sequelize instance
    });
};
exports.userPassword = userPassword;
