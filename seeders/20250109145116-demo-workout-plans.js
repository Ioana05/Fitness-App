"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const trainerClients = await queryInterface.sequelize.query(
      "SELECT trainer_id, client_id, start_date from TrainerClients;"
    );
    const relationships = trainerClients[0];

    const workoutPlans = relationships.map((rel) => {      
      const name = faker.helpers.arrayElement([
        "12-Week Strength Building",
        "Weight Loss Program",
        "Muscle Gain Plan",
        "Fitness Fundamentals",
        "Athletic Performance",
        "Flexibility and Mobility",
        "Bodyweight Training",
        "Core Strength",
        "Endurance Training",
        "Prenatal Fitness",
      ]);

      const startDate = faker.date.between({
        from: rel.start_date,
        to: "2026-1-10",
      });
      const endDate = faker.date.between({
        from: startDate,
        to: "2026-1-10",
      });

      return {
      trainer_id: rel.trainer_id,
      client_id: rel.client_id,
      name: name,
      start_date: startDate,
      end_date: endDate,
      createdAt: startDate,
      updatedAt: startDate
    }});

    await queryInterface.bulkInsert("WorkoutPlans", workoutPlans, {});
    return workoutPlans;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutPlans", null, {});
  },
};
