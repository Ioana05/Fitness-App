"use strict";

const { v4: uuidv4 } = require("uuid");

const exercises = [
  {
    name: "Barbell Squat",
    muscle_group: "Legs",
    difficulty_level: "3",
    instructions:
      "Stand with feet shoulder-width apart, lower body by bending knees...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Bench Press",
    muscle_group: "Chest",
    difficulty_level: "3",
    instructions: "Lie on bench, grip barbell slightly wider than shoulders...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Deadlift",
    muscle_group: "Back",
    difficulty_level: "4",
    instructions:
      "Stand with feet hip-width apart, bend knees and grip barbell...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Pull-up",
    muscle_group: "Back",
    difficulty_level: "4",
    instructions: "Hang from bar with hands shoulder-width apart...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Plank",
    muscle_group: "Core",
    difficulty_level: "2",
    instructions: "Lie face down, prop body up on forearms and toes...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Russian Twist",
    muscle_group: "Core",
    difficulty_level: "2",
    instructions: "Sit on floor, lean back slightly, lift feet off floor...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Dumbbell Curl",
    muscle_group: "Arms",
    difficulty_level: "2",
    instructions: "Stand with feet shoulder-width apart, arms at sides...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tricep Dip",
    muscle_group: "Arms",
    difficulty_level: "2",
    instructions: "Sit on bench, grip edge with hands shoulder-width apart...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Lateral Raise",
    muscle_group: "Shoulders",
    difficulty_level: "5",
    instructions: "Stand with feet shoulder-width apart, arms at sides...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Shoulder Press",
    muscle_group: "Shoulders",
    difficulty_level: "3",
    instructions: "Sit on bench, grip barbell with hands shoulder-width apart...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Treadmill Run",
    muscle_group: "Cardio",
    difficulty_level: "5",
    instructions: "Start treadmill, adjust speed and incline to desired levels...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Stationary Bike",
    muscle_group: "Cardio",
    difficulty_level: "1",
    instructions: "Adjust seat and resistance to desired levels...",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Jump Rope",
    muscle_group: "Cardio",
    difficulty_level: "1",
    instructions: "Hold handles, swing rope over",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Exercises", exercises, {});
    return exercises;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
