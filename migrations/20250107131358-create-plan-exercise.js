"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanExercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workout_day_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "WorkoutDays",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Exercises",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      sets: {
        type: Sequelize.INTEGER,
      },
      reps_target: {
        type: Sequelize.INTEGER,
      },
      rest_seconds: {
        type: Sequelize.INTEGER,
      },
      order_in_workout: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("PlanExercises");
  },
};
