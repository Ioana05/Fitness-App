// models/workoutPlan.js
"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class WorkoutPlan extends Model {
    static associate(models) {
      WorkoutPlan.belongsTo(models.Trainer, {
        foreignKey: "trainer_id",
      });

      WorkoutPlan.belongsTo(models.User, {
        foreignKey: "client_id",
        as: "client",
      });

      WorkoutPlan.hasMany(models.WorkoutDay, {
        foreignKey: "workout_plan_id",
      });

      WorkoutPlan.hasMany(models.PlanGoal, {
        foreignKey: "workout_plan_id",
      });
    }
  }

  WorkoutPlan.init(
    {
      trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "WorkoutPlan",
    }
  );

  return WorkoutPlan;
};
