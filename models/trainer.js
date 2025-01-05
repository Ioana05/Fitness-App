"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trainer.belongsTo(models.User,  { foreignKey: "user_id" });
      trainer.hasMany(models.workoutPlan);
    }
  }
  trainer.init(
    {
      user_id: DataTypes.STRING,
      specialization: DataTypes.TEXT,
      years_experience: DataTypes.INTEGER,
      hourly_rate: DataTypes.FLOAT,
      availability: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "trainer",
    }
  );
  return trainer;
};
