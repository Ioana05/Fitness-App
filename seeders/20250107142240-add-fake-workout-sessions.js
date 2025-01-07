"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "WorkoutSessions",
      [
        {
          user_id: 1,
          workout_day_id: 1,
          date: "2025-01-15",
          duration_minutes: 65,
          notes: "Great chest day, feeling stronger on bench press",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          workout_day_id: 2,
          date: "2025-01-17",
          duration_minutes: 55,
          notes: "Good leg session, focused on form for squats",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          workout_day_id: 3,
          date: "2025-01-15",
          duration_minutes: 75,
          notes: "Hit new PR on deadlifts, back feeling strong",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          workout_day_id: 4,
          date: "2025-01-17",
          duration_minutes: 60,
          notes: "Shoulder workout completed, good pump",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          workout_day_id: 5,
          date: "2025-01-16",
          duration_minutes: 50,
          notes: "Quick but intense HIIT session",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          workout_day_id: 6,
          date: "2025-01-18",
          duration_minutes: 70,
          notes: "Full body workout, increased weights on all exercises",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          workout_day_id: 7,
          date: "2025-01-16",
          duration_minutes: 45,
          notes: "Push day completed, chest and triceps exhausted",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          workout_day_id: 8,
          date: "2025-01-18",
          duration_minutes: 55,
          notes: "Pull day done, focused on lat engagement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          workout_day_id: 9,
          date: "2025-01-15",
          duration_minutes: 65,
          notes: "Upper body session complete, improving on pull-ups",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          workout_day_id: 10,
          date: "2025-01-17",
          duration_minutes: 60,
          notes: "Lower body and core day, legs feeling strong",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutSessions", null, {});
  },
};
