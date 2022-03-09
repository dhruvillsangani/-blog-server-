"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
const init = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
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
        tableName: "users",
        sequelize, // passing the sequelize instance
    });
};
exports.init = init;
