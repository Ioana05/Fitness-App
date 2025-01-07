"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class PlanExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanExercise.belongsTo(models.WorkoutDay, {
        foreignKey: "workout_day_id",
      });
      PlanExercise.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
    }
  }
  PlanExercise.init(
    {
      workout_day_id: DataTypes.INTEGER,
      exercise_id: DataTypes.INTEGER,
      sets: DataTypes.INTEGER,
      reps_target: DataTypes.INTEGER,
      rest_seconds: DataTypes.INTEGER,
      order_in_workout: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlanExercise",
    }
  );
  return PlanExercise;
};
