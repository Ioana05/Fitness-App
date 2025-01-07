"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "WorkoutDays",
      [
        {
          workout_plan_id: 1,
          day_number: 1,
          focus_area: "Chest and Triceps",
          instructions:
            "Focus on proper form during pressing movements. Start with compound exercises then move to isolation.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 1,
          day_number: 2,
          focus_area: "Back and Biceps",
          instructions:
            "Maintain strict form on pulling movements. Control the eccentric portion of each exercise.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 2,
          day_number: 1,
          focus_area: "Lower Body",
          instructions:
            "Emphasize proper depth in squats. Keep core engaged throughout all exercises.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 2,
          day_number: 2,
          focus_area: "Shoulders and Arms",
          instructions:
            "Focus on controlled movements and full range of motion. Minimize body swing during exercises.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 3,
          day_number: 1,
          focus_area: "Full Body Strength",
          instructions:
            "Compound movements with emphasis on progressive overload. Rest 2-3 minutes between sets.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 3,
          day_number: 2,
          focus_area: "HIIT and Core",
          instructions:
            "High intensity intervals with minimal rest. Focus on maintaining form even when fatigued.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 4,
          day_number: 1,
          focus_area: "Push Day",
          instructions:
            "All pressing movements. Start heavy with bench press, then move to lighter accessory work.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 4,
          day_number: 2,
          focus_area: "Pull Day",
          instructions:
            "Focus on back thickness and width. Include both vertical and horizontal pulling movements.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 5,
          day_number: 1,
          focus_area: "Upper Body",
          instructions:
            "Alternate between push and pull movements. Focus on mind-muscle connection.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workout_plan_id: 5,
          day_number: 2,
          focus_area: "Lower Body and Core",
          instructions:
            "Begin with compound leg movements, finish with core circuit. Maintain proper breathing throughout.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkoutDays", null, {});
  },
};
