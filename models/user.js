"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Trainer, { foreignKey: "user_id" });
      User.hasMany(models.WorkoutSession, { foreignKey: "user_id" });
      User.hasMany(models.WorkoutPlan, { foreignKey: "client_id" });
      User.hasMany(models.TrainerClient, { foreignKey: "client_id" });
      User.hasMany(models.ClientTrainerRequest, { foreignKey: "client_id" });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE"],
      },
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
