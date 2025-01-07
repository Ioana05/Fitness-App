"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SessionExercises",
      [
        {
          workout_session_id: 1,
          exercise_id: 1, // Bench Press
          sets_completed: 3,
          reps_completed: 12,
          weight: 135.5,
          notes: "Form felt good, increased weight from last session",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 1,
          exercise_id: 5, // Push-ups
          sets_completed: 3,
          reps_completed: 15,
          weight: 0, // Bodyweight exercise
          notes: "Added resistance band for last set",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 2,
          exercise_id: 2, // Squats
          sets_completed: 4,
          reps_completed: 10,
          weight: 185.0,
          notes: "Hit depth on all reps, feeling stronger",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 2,
          exercise_id: 6, // Lunges
          sets_completed: 3,
          reps_completed: 12,
          weight: 30.0, // Dumbbells
          notes: "Used dumbbells for extra resistance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 3,
          exercise_id: 3, // Deadlift
          sets_completed: 5,
          reps_completed: 5,
          weight: 225.0,
          notes: "New PR! Form stayed solid throughout",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 3,
          exercise_id: 4, // Pull-ups
          sets_completed: 3,
          reps_completed: 8,
          weight: 0, // Bodyweight exercise
          notes: "No assistance needed, form improving",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 4,
          exercise_id: 7, // Shoulder Press
          sets_completed: 3,
          reps_completed: 12,
          weight: 65.0,
          notes: "Shoulders feeling strong today",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 4,
          exercise_id: 8, // Bicep Curls
          sets_completed: 4,
          reps_completed: 12,
          weight: 25.0,
          notes: "Strict form, no swinging",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 5,
          exercise_id: 9, // Planks
          sets_completed: 3,
          reps_completed: 60,
          weight: 0, // Bodyweight exercise
          notes: "Maintained solid position for full duration",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_session_id: 5,
          exercise_id: 10, // Crunches
          sets_completed: 3,
          reps_completed: 20,
          weight: 0, // Bodyweight exercise
          notes: "Added twist variation for last set",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SessionExercises", null, {});
  },
};
