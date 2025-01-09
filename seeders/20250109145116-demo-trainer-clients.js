"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const trainers = await queryInterface.sequelize.query(
      "SELECT id from Trainers;"
    );
    const users = await queryInterface.sequelize.query(
      "SELECT id from Users WHERE id NOT IN (SELECT user_id from Trainers);"
    );

    const trainerRows = trainers[0];
    const clientRows = users[0];

    const trainerClients = [];

    trainerRows.forEach((trainer) => {
      // Each trainer gets 2-4 clients
      const numClients = faker.number.int({ min: 2, max: 4 });
      for (let i = 0; i < numClients; i++) {
        if (clientRows[i]) {
          trainerClients.push({
            trainer_id: trainer.id,
            client_id: clientRows[i].id,
            start_date: faker.date.past(),
            sessions_remaining: faker.number.int({ min: 0, max: 20 }),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    });

    await queryInterface.bulkInsert("TrainerClients", trainerClients, {});
    return trainerClients;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TrainerClients", null, {});
  },
};
