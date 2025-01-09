"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get users to reference
    const users = await queryInterface.sequelize.query(
      "SELECT id from Users LIMIT 3;"
    );
    const userRows = users[0];

    const trainers = userRows.map((user) => ({
      user_id: user.id,
      specialization: faker.helpers.arrayElement([
        "Weight Training",
        "Yoga",
        "CrossFit",
        "Cardio",
        "Nutrition",
      ]),
      years_experience: faker.number.int({ min: 1, max: 20 }),
      hourly_rate: faker.number.float({ min: 30, max: 150, precision: 0.01 }),
      availability: faker.helpers.arrayElement(["AVAILABLE", "UNAVAILABLE"]),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Trainers", trainers, {});
    return trainers;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Trainers", null, {});
  },
};
