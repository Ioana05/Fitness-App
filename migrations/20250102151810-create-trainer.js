"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("trainers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      specialization: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      years_experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hourly_rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      availability: {
        type: Sequelize.ENUM,
        values: ["MALE", "FEMALE"],
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("trainers");
  },
};
