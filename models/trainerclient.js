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
      TrainerClient.belongsTo(models.Trainer, { foreignKey: "trainer_id" });
      TrainerClient.belongsTo(models.User, { foreignKey: "client_id" });
    }
  }
  TrainerClient.init(
    {
      trainer_id: DataTypes.INTEGER,
      client_id: DataTypes.INTEGER,
      start_date: DataTypes.STRING,
      session_remaining: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TrainerClient",
    }
  );
  return TrainerClient;
};
