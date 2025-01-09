"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class TrainerClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.TrainerClient
    }
  }
  TrainerClient.init(
    {
      trainer_id: DataTypes.INTEGER,
      client_id: DataTypes.INTEGER,
      start_date: DataTypes.STRING,
      sessions_remaining: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TrainerClient",
    }
  );
  return TrainerClient;
};
