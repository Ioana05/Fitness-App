"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class WorkoutDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutDay.belongsTo(models.workoutPlan, {
        foreignKey: "workout_plan_id",
      });
      WorkoutDay.hasMany(models.PlanExercise, { foreignKey: "workout_day_id" });
      WorkoutDay.hasMany(models.WorkoutSession, {
        foreignKey: "workout_day_id",
      });
    }
  }
  WorkoutDay.init(
    {
      workout_plan_id: DataTypes.INTEGER,
      day_number: DataTypes.INTEGER,
      focus_area: DataTypes.STRING,
      instructions: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "WorkoutDay",
    }
  );
  return WorkoutDay;
};
