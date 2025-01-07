"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SessionExercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workout_session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "WorkoutSessions",
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
      sets_completed: {
        type: Sequelize.INTEGER,
      },
      reps_completed: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.DECIMAL,
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("SessionExercises");
  },
};
