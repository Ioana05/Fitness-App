"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class PlanGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanGoal.belongsTo(models.workoutPlan, { foreignKey: "workout_plan_id" });
    }
  }
  PlanGoal.init(
    {
      workout_plan_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      goal_type: DataTypes.ENUM("weight", "measurement"),
      measurement_type: DataTypes.STRING,
      target_value: DataTypes.DECIMAL,
      initial_value: DataTypes.DECIMAL,
      deadline: DataTypes.DATE,
      status: DataTypes.ENUM("complete", "incomplete"),
    },
    {
      sequelize,
      modelName: "PlanGoal",
    }
  );
  return PlanGoal;
};
