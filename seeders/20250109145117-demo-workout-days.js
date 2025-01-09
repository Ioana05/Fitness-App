"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const workoutPlans = await queryInterface.sequelize.query(
      "SELECT id from WorkoutPlans;"
    );
    const planRows = workoutPlans[0];

    const workoutDays = [];

    planRows.forEach((plan) => {
      // Create 3-5 days per plan
      const numDays = faker.number.int({ min: 3, max: 5 });
      for (let i = 1; i <= numDays; i++) {
        workoutDays.push({
          workout_plan_id: plan.id,
          day_number: i,
          focus_area: faker.helpers.arrayElement([
            "Upper Body",
            "Lower Body",
            "Core",
            "Full Body",
            "Cardio",
            "Recovery",
          ]),
          instructions: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert("WorkoutDays", workoutDays, {});
    return workoutDays;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutDays", null, {});
  },
};
