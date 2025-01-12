"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const workoutDays = await queryInterface.sequelize.query(
      "SELECT id from WorkoutDays;"
    );
    const exercises = await queryInterface.sequelize.query(
      "SELECT id from Exercises;"
    );

    const dayRows = workoutDays[0];
    const exerciseRows = exercises[0];

    const planExercises = [];

    dayRows.forEach((day) => {
      const numExercises = faker.number.int({ min: 2, max: 6 });
      for (let i = 0; i < numExercises; i++) {
        planExercises.push({
          workout_day_id: day.id,
          exercise_id: faker.helpers.arrayElement(exerciseRows).id,
          sets: faker.number.int({ min: 2, max: 5 }),
          reps_target: faker.number.int({ min: 8, max: 20 }),
          rest_seconds: faker.helpers.arrayElement([30, 45, 60, 90, 120]),
          order_in_workout: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert("PlanExercises", planExercises, {});
    return planExercises;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PlanExercises", null, {});
  },
};
