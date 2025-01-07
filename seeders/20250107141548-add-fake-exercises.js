"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Exercises",
      [
        {
          name: "Bench Press",
          muscle_group: "Chest",
          difficulty_level: "3",
          instructions:
            "Lie on bench with feet flat on floor. Grip bar slightly wider than shoulder width. Lower bar to chest, then press up to starting position.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Squats",
          muscle_group: "Legs",
          difficulty_level: "4",
          instructions:
            "Stand with feet shoulder-width apart. Lower body by bending knees and hips, keeping chest up. Return to starting position.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Deadlift",
          muscle_group: "Back",
          difficulty_level: "5",
          instructions:
            "Stand with feet hip-width apart, bar over midfoot. Hinge at hips to grip bar, then drive through heels to stand up with bar.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pull-ups",
          muscle_group: "Back",
          difficulty_level: "4",
          instructions:
            "Hang from pull-up bar with hands slightly wider than shoulders. Pull body up until chin clears bar, then lower with control.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Push-ups",
          muscle_group: "Chest",
          difficulty_level: "2",
          instructions:
            "Start in plank position with hands slightly wider than shoulders. Lower body until chest nearly touches ground, then push back up.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lunges",
          muscle_group: "Legs",
          difficulty_level: "2",
          instructions:
            "Stand tall, step forward with one leg, lowering hips until both knees are bent at 90 degrees. Return to starting position.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shoulder Press",
          muscle_group: "Shoulders",
          difficulty_level: "3",
          instructions:
            "Sit or stand with dumbbells at shoulder height. Press weights overhead until arms are straight, then lower with control.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bicep Curls",
          muscle_group: "Arms",
          difficulty_level: "1",
          instructions:
            "Stand with dumbbells at sides, palms forward. Curl weights toward shoulders, keeping elbows close to body. Lower with control.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Planks",
          muscle_group: "Core",
          difficulty_level: "2",
          instructions:
            "Start in forearm plank position, body forming straight line from head to heels. Hold position while engaging core.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Crunches",
          muscle_group: "Core",
          difficulty_level: "1",
          instructions:
            "Lie on back with knees bent, feet flat. Place hands behind head, lift shoulders off ground while engaging core.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
