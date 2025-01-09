"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [...Array(10)].map(() => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
      email: faker.internet.email(),
      password: "$2a$10$XE8GKKzx0yLkpqjUDO4Oiu8vq0Wd6UFJoLiNVV2XyNyGGJGHBJYh6", // hashed 'password123'
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
