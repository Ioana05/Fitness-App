"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const fakeEmailGenerator = (firstName, lastName) => {
  const randomSeparator = faker.helpers.arrayElement([".", "_", "-", ""]);
  const randomNumber = Math.floor(Math.random() * 100);
  const randomDomain = faker.helpers.arrayElement(["gmail.com", "yahoo.com", "outlook.com"]);

  const firstPart = firstName.toLowerCase();
  const secondPart = lastName.toLowerCase().slice(0, 3);

  const email = `${firstPart}${randomSeparator}${secondPart}${randomNumber}@${randomDomain}`;

  return email;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    const users = [...Array(100)].map(() => {
      const createdAt = faker.date.between({
        from: "2014-01-01",
        to: "2025-1-10",
      });

      const password = faker.internet.password();
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const first_name = faker.person.firstName();
      const last_name = faker.person.lastName();
      const email = fakeEmailGenerator(first_name, last_name);

      return {
        first_name: first_name,
        last_name: last_name,
        age: faker.number.int({ min: 18, max: 65 }),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        email: email,
        password: hashedPassword,
        createdAt: createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: "2025-1-10" }),
      };
    });

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
