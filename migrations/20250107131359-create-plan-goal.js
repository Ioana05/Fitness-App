"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanGoals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workout_plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "WorkoutPlans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
      },
      goal_type: {
        type: Sequelize.ENUM("weight", "measurement"),
      },
      measurement_type: {
        type: Sequelize.STRING,
      },
      target_value: {
        type: Sequelize.DECIMAL,
      },
      initial_value: {
        type: Sequelize.DECIMAL,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("complete", "incomplete"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlanGoals");
  },
};
