"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const trainers = await queryInterface.sequelize.query(
      "SELECT id, createdAt from Trainers;"
    );
    const users = await queryInterface.sequelize.query(
      `
      SELECT id, createdAt 
      FROM Users 
      WHERE id NOT IN (
        SELECT user_id 
        FROM Trainers
      ) 
      ORDER BY RANDOM();
      `
    );

    const trainerRows = trainers[0];
    const clientRows = users[0];

    let clientsUsed = [];
    const trainerClients = [];

    trainerRows.forEach((trainer) => {
      const trainerCreatedAt = new Date(trainer.createdAt);
      const numberOfClients = faker.number.int({ min: 0, max: 4 });
      const clients = clientRows
      .filter((client) => !clientsUsed.includes(client.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfClients);

      clients.forEach((client) => {
        const clientCreatedAt = new Date(client.createdAt);
        const maxDate = trainerCreatedAt > clientCreatedAt ? trainerCreatedAt : clientCreatedAt;
        const startDate = faker.date.between({
          from: maxDate,
          to: "2026-1-10",
        });

        trainerClients.push({
          trainer_id: trainer.id,
          client_id: client.id,
          start_date: startDate,
          session_remaining: faker.number.int({ min: 0, max: 21 }),
          createdAt: startDate,
          updatedAt: new Date(),
        });

        clientsUsed.push(client.id);
      });
    });

    await queryInterface.bulkInsert("TrainerClients", trainerClients, {});
    return trainerClients;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TrainerClients", null, {});
  },
};
