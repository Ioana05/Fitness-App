"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ClientTrainerRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClientTrainerRequest.belongsTo(models.Trainer, {
        foreignKey: "trainer_id",
      });
      ClientTrainerRequest.belongsTo(models.User, { foreignKey: "client_id" });
    }
  }
  ClientTrainerRequest.init(
    {
      trainer_id: DataTypes.INTEGER,
      client_id: DataTypes.INTEGER,
      request_date: DataTypes.DATE,
      status: DataTypes.ENUM("ACCEPTED", "REJECTED", "PENDING"),
      number_of_sessions: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ClientTrainerRequest",
    }
  );
  return ClientTrainerRequest;
};
