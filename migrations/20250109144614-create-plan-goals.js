"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanGoals", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
        type: Sequelize.STRING(255),
      },
      goal_type: {
        type: Sequelize.ENUM("weight", "measurement"),
      },
      measurement_type: {
        type: Sequelize.STRING(50),
      },
      target_value: {
        type: Sequelize.DECIMAL(10, 2),
      },
      initial_value: {
        type: Sequelize.DECIMAL(10, 2),
      },
      deadline: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("complete", "incomplete"),
        defaultValue: "incomplete",
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
