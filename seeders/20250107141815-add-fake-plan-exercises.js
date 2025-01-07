"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PlanExercises",
      [
        {
          workout_day_id: 1, // Day 1 of first workout plan
          exercise_id: 1, // Bench Press
          sets: 4,
          reps_target: 12,
          rest_seconds: 60,
          order_in_workout: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 1, // Day 1 of first workout plan
          exercise_id: 5, // Push-ups
          sets: 3,
          reps_target: 15,
          rest_seconds: 45,
          order_in_workout: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 2, // Day 2 of first workout plan
          exercise_id: 2, // Squats
          sets: 4,
          reps_target: 10,
          rest_seconds: 90,
          order_in_workout: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 2, // Day 2 of first workout plan
          exercise_id: 6, // Lunges
          sets: 3,
          reps_target: 12,
          rest_seconds: 60,
          order_in_workout: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 3, // Day 1 of second workout plan
          exercise_id: 3, // Deadlift
          sets: 5,
          reps_target: 5,
          rest_seconds: 120,
          order_in_workout: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 3, // Day 1 of second workout plan
          exercise_id: 4, // Pull-ups
          sets: 4,
          reps_target: 8,
          rest_seconds: 90,
          order_in_workout: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 4,
          exercise_id: 7, // Shoulder Press
          sets: 3,
          reps_target: 12,
          rest_seconds: 60,
          order_in_workout: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 4,
          exercise_id: 8, // Bicep Curls
          sets: 3,
          reps_target: 15,
          rest_seconds: 45,
          order_in_workout: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 5,
          exercise_id: 9, // Planks
          sets: 3,
          reps_target: 60, // Duration in seconds for planks
          rest_seconds: 45,
          order_in_workout: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_day_id: 5,
          exercise_id: 10, // Crunches
          sets: 3,
          reps_target: 20,
          rest_seconds: 30,
          order_in_workout: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PlanExercises", null, {});
  },
};
