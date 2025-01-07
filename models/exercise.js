"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.hasMany(models.PlanExercise, { foreignKey: "exercise_id" });
      Exercise.hasMany(models.SessionExercise, { foreignKey: "exercise_id" });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      muscle_group: DataTypes.STRING,
      difficulty_level: DataTypes.ENUM("1", "2", "3", "4", "5"),
      instructions: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Exercise",
    }
  );
  return Exercise;
};
