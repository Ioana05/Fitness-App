"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Get workout sessions using raw query with proper syntax
      const [workoutSessions] = await queryInterface.sequelize.query(
        "SELECT id FROM WorkoutSessions;" // Removed quotes around table name
      );

      // Get exercises using raw query with proper syntax
      const [exercises] = await queryInterface.sequelize.query(
        "SELECT id FROM Exercises;" // Removed quotes around table name
      );

      if (!workoutSessions.length || !exercises.length) {
        console.log("Missing prerequisite data:");
        console.log("Workout Sessions:", workoutSessions.length);
        console.log("Exercises:", exercises.length);
        return;
      }

      const sessionExercises = [];

      workoutSessions.forEach((session) => {
        const numExercises = faker.number.int({ min: 4, max: 6 });

        for (let i = 0; i < numExercises; i++) {
          const selectedExercise = faker.helpers.arrayElement(exercises);

          const notes = faker.helpers.arrayElement([
            "Increased weight from last session",
            "Felt strong today",
            "Need to improve form",
            "Reduced weight due to fatigue",
            "Need to increase weights next time",
            "Focused on form",
            null,
          ]);

          sessionExercises.push({
            workout_session_id: parseInt(session.id, 10), // Ensure integer
            exercise_id: parseInt(selectedExercise.id, 10), // Ensure integer
            sets_completed: faker.number.int({ min: 2, max: 5 }),
            reps_completed: faker.number.int({ min: 6, max: 15 }),
            weight: parseFloat(
              faker.number
                .float({ min: 5, max: 100, precision: 0.5 })
                .toFixed(2)
            ), // Ensure proper float format
            notes: notes,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      if (sessionExercises.length > 0) {
        await queryInterface.bulkInsert(
          "SessionExercises",
          sessionExercises,
          {}
        );
      }
    } catch (error) {
      console.error("Error in session exercises seeder:", error);
      console.error("Error details:", error.message);
      if (error.parent) {
        console.error("Parent error:", error.parent);
      }
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SessionExercises", null, {});
  },
};
