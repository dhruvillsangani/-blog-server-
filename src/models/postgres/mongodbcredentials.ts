import { DataTypes, Model, Sequelize } from "sequelize";

export class mongo_credentials extends Model {
  public key: string;
  public value: string;
}

export const mongo = (sequelize: Sequelize) => {
  mongo_credentials.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "application_configuration",
      timestamps: false,
      sequelize,
    }
  );
};
