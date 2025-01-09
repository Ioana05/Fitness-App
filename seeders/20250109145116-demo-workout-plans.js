"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const trainerClients = await queryInterface.sequelize.query(
      "SELECT trainer_id, client_id from TrainerClients;"
    );
    const relationships = trainerClients[0];

    const workoutPlans = relationships.map((rel) => ({
      trainer_id: rel.trainer_id,
      client_id: rel.client_id,
      name: faker.helpers.arrayElement([
        "12-Week Strength Building",
        "Weight Loss Program",
        "Muscle Gain Plan",
        "Fitness Fundamentals",
        "Athletic Performance",
      ]),
      start_date: faker.date.past(),
      end_date: faker.date.future(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("WorkoutPlans", workoutPlans, {});
    return workoutPlans;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutPlans", null, {});
  },
};
