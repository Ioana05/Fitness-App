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

    const planGoals = [];

    planRows.forEach((plan) => {
      // Create 2-3 goals per plan
      const numGoals = faker.number.int({ min: 2, max: 3 });
      for (let i = 0; i < numGoals; i++) {
        const isWeight = faker.datatype.boolean();
        planGoals.push({
          workout_plan_id: plan.id,
          name: faker.helpers.arrayElement([
            "Weight Loss",
            "Muscle Gain",
            "Body Fat Reduction",
            "Strength Increase",
            "Endurance Improvement",
          ]),
          goal_type: isWeight ? "WEIGHT" : "MEASUREMENT",
          measurement_type: isWeight
            ? "kg"
            : faker.helpers.arrayElement(["cm", "inches", "bpm"]),
          target_value: faker.number.float({
            min: 50,
            max: 100,
            precision: 0.1,
          }),
          initial_value: faker.number.float({
            min: 60,
            max: 110,
            precision: 0.1,
          }),
          deadline: faker.date.future(),
          status: faker.helpers.arrayElement(["COMPLETE", "INCOMPLETE"]),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert("PlanGoals", planGoals, {});
    return planGoals;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PlanGoals", null, {});
  },
};
