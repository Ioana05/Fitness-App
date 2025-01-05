"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class workoutPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      workoutPlan.belongsTo(models.trainer, { foreignKey: "trainer_id" });
    }
  }
  workoutPlan.init(
    {
      trainer_id: DataTypes.INTEGER,
      client_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "workoutPlan",
    }
  );
  return workoutPlan;
};
