"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class WorkoutSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutSession.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  WorkoutSession.init(
    {
      user_id: DataTypes.INTEGER,
      workout_day_id: DataTypes.INTEGER,
      date: DataTypes.STRING,
      duration_minutes: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "WorkoutSession",
    }
  );
  return WorkoutSession;
};
