import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const deleteWorkoutDayMutationResolver = async (_, { id }, context) => {
  const userId = context.user_id;

  // Find workout day with its exercises
  const workoutDay = await db.WorkoutDay.findOne({
    where: { id },
    include: [
      {
        model: db.PlanExercise,
        include: [db.Exercise],
      },
    ],
  });

  if (!workoutDay) {
    throw new Error(`Workout day with id ${id} not found`);
  }

  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id: workoutDay.workout_plan_id,
    },
  });

  if (!workoutPlan) {
    throw new Error(
      `Workout plan with id ${workoutDay.workout_plan_id} not found`
    );
  }

  const trainer = await db.Trainer.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!trainer) {
    throw new Error("You are not authorized to perform this action!");
  }

  if (workoutPlan.trainer_id !== trainer.id) {
    throw new Error("You are not authorized to perform this action!");
  }

  // Delete all associated plan exercises first
  await db.PlanExercise.destroy({
    where: {
      workout_day_id: workoutDay.id,
    },
  });

  await workoutDay.destroy();

  return workoutDay;
};

const deleteWorkoutDayMutation = {
    type: workoutDayType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteWorkoutDayMutationResolver,
};

export default deleteWorkoutDayMutation;
