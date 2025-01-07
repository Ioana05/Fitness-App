"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class SessionExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SessionExercise.belongsTo(models.WorkoutSession, {
        foreignKey: "workout_session_id",
      });
      SessionExercise.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
    }
  }
  SessionExercise.init(
    {
      workout_session_id: DataTypes.INTEGER,
      exercise_id: DataTypes.INTEGER,
      sets_completed: DataTypes.INTEGER,
      reps_completed: DataTypes.INTEGER,
      weight: DataTypes.DECIMAL,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SessionExercise",
    }
  );
  return SessionExercise;
};
