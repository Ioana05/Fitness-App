"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const trainersCount = 15;
    const users = await queryInterface.sequelize.query(
      `SELECT id, createdAt, age FROM Users ORDER BY RANDOM() LIMIT ${trainersCount}`
    );

    const usersRows = users[0];

    const trainers = usersRows.map((user) => {
      const age = user.age;
      const maxExperience = age - 18 < 1 ? 1 : age - 18;
      const yearsOfExperience = faker.number.int({ min: 1, max:  maxExperience });

      const specialization = faker.helpers.arrayElement([
          "Weight Training",
          "Yoga",
          "CrossFit",
          "Cardio",
          "Nutrition",
          "Pilates",
          "Zumba",
          "Boxing",
        ]);

      const createdAt = faker.date.between({ from: user.createdAt, to: "2025-1-10" });

      return {
        user_id: user.id,
        specialization: specialization,
        years_experience: yearsOfExperience,
        hourly_rate: faker.number.float({ min: 12, max: 150, precision: 0.01 }).toPrecision(1),
        availability: faker.helpers.arrayElement(["AVAILABLE", "UNAVAILABLE"]),
        createdAt: createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: "2025-1-10" }),
      };
  });

    await queryInterface.bulkInsert("Trainers", trainers, {});
    return trainers;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Trainers", null, {});
  },
};
