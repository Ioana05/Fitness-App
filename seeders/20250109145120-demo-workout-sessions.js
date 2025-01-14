"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const [users] = await queryInterface.sequelize.query(
        'SELECT id FROM "Users";'
      );

      const [workoutDays] = await queryInterface.sequelize.query(
        'SELECT id FROM "WorkoutDays";'
      );

      if (!users.length) {
        console.log("No users found");
        return;
      }

      const workoutSessions = [];

      users.forEach((user) => {
        const numSessions = faker.number.int({ min: 5, max: 10 });

        for (let i = 0; i < numSessions; i++) {
          const shouldHaveWorkoutDay = faker.datatype.boolean();
          const workoutDayId =
            shouldHaveWorkoutDay && workoutDays.length > 0
              ? faker.helpers.arrayElement(workoutDays).id
              : null;
          const notes = faker.helpers.arrayElement([
            "Great workout!",
            "Felt tired today",
            "Need to increase weights next time",
            "Focused on form",
            "Need to work on cardio",
            "Need to work on flexibility",
            null,
          ]);

          workoutSessions.push({
            user_id: user.id,
            workout_day_id: workoutDayId,
            date: faker.date.recent({ days: 30 }),
            duration_minutes: faker.number.int({ min: 30, max: 120 }),
            notes: notes,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      if (workoutSessions.length > 0) {
        await queryInterface.bulkInsert("WorkoutSessions", workoutSessions, {});
      }
    } catch (error) {
      console.error("Error in workout sessions seeder:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutSessions", null, {});
  },
};
