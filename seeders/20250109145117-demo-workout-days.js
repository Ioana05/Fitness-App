"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const workoutPlans = await queryInterface.sequelize.query(
      "SELECT id from WorkoutPlans;"
    );
    const planRows = workoutPlans[0];

    const workoutDays = [];

    planRows.forEach((plan) => {
      const focusArea = faker.helpers.arrayElement([
            "Upper Body",
            "Lower Body",
            "Core",
            "Full Body",
            "Cardio",
            "Recovery",
            "Flexibility",
            "Endurance",
            "Strength",            
          ]);

        const instructions = faker.helpers.arrayElement([
          "Complete 3 sets of 10 reps for each exercise.",
          "Perform each exercise for 30 seconds, then rest for 15 seconds.",
          "Complete 4 sets of 8 reps for each exercise.",
          "Perform each exercise for 45 seconds, then rest for 20 seconds.",
          "Complete 5 sets of 5 reps for each exercise.",
          "Perform each exercise for 1 minute, then rest for 30 seconds.",
          "Complete 3 sets of 12 reps for each exercise.",
          "Perform each exercise for 20 seconds, then rest for 10 seconds.",
          "Complete 4 sets of 6 reps for each exercise.",
          "Perform each exercise for 1 minute, then rest for 45 seconds.",
        ]);

      const numDays = faker.number.int({ min: 1, max: 20 });
      for (let i = 1; i <= numDays; i++) {
        workoutDays.push({
          workout_plan_id: plan.id,
          day_number: i,
          focus_area: focusArea,
          instructions: instructions,
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
