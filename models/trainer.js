"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trainer.belongsTo(models.User, { foreignKey: "user_id" });
      // Trainer.hasMany(models.workoutPlan);
    }
  }
  Trainer.init(
    {
      // user_id: DataTypes.INTEGER,
      specialization: DataTypes.TEXT,
      // years_experience: DataTypes.INTEGER,
      // hourly_rate: DataTypes.FLOAT,
      // availability: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Trainer",
    }
  );
  return Trainer;
};
