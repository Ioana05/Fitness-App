import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import workoutDayUpdateInputType from "../../types/workoutDay/workoutUpdateInputType.js";
import db from "../../../models/index.js";
import { GraphQLInt, GraphQLNonNull } from "graphql";

const updateWorkoutDayMutationResolver = async (_, args, context) => {
  const id = args.id;
  const userId = context.user_id;
  const inputWorkoutDay = args.workoutDay;

  const workoutDay = await db.WorkoutDay.findOne({
    where: {
      id,
    },
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

  const dayNumber = inputWorkoutDay.dayNumber;
  if (dayNumber && dayNumber < 1) {
    throw new Error("Day number should be a positive value!");
  }

  const focusArea = inputWorkoutDay.focusArea;
  if (focusArea && focusArea.length < 3) {
    throw new Error("Focus area should have minimum 3 characters!");
  }

  const instructions = inputWorkoutDay.instructions;
  if (instructions && instructions.length < 10) {
    throw new Error("Instructions should have minimum 10 characters!");
  }

  // Filter non-null values excluding exercises
  const { exercises, ...workoutDayFields } = inputWorkoutDay;
  const nonNullValues = Object.entries(workoutDayFields).reduce(
    (acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  // Convert keys to snake_case
  const workoutDayData = Object.entries(nonNullValues).reduce(
    (acc, [key, value]) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      acc[snakeKey] = value;
      return acc;
    },
    {}
  );

  const updatedWorkoutDay = await workoutDay.update(workoutDayData);

  if (exercises) {
    // Check if all exercise fields are null
    const isAllNull = Object.values(exercises).every((value) => value === null);
    if (isAllNull) {
      return updatedWorkoutDay;
    }

    // Validate exercise data
    if (exercises.exerciseId) {
      const foundExercise = await db.Exercise.findByPk(exercises.exerciseId);
      if (!foundExercise) {
        throw new Error(
          `Exercise with id ${exercises.exerciseId} does not exist!`
        );
      }
    }

    if (exercises.sets && exercises.sets < 0) {
      throw new Error("Number of sets should be a positive value!");
    }

    if (exercises.repsTarget && exercises.repsTarget < 0) {
      throw new Error("Number of reps should be a positive value!");
    }

    if (exercises.restSeconds && exercises.restSeconds < 0) {
      throw new Error("Rest in seconds should be a positive value!");
    }

    if (exercises.orderInWorkout && exercises.orderInWorkout < 1) {
      throw new Error("Order in workout should be a positive value!");
    }

    // Filter out null values from exercise
    const filteredExercise = Object.entries(exercises).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // Convert exercise keys to snake_case
    const snakeCaseExercise = Object.entries(filteredExercise).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        acc[snakeKey] = value;
        return acc;
      },
      {}
    );

    if (Object.keys(snakeCaseExercise).length > 0) {
      const exerciseData = {
        workout_day_id: updatedWorkoutDay.id,
        ...snakeCaseExercise,
      };

      await db.PlanExercise.create(exerciseData);
    }
  }

  return updatedWorkoutDay;
};

const updateWorkoutDayMutation = {
  type: workoutDayType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    workoutDay: { type: workoutDayUpdateInputType },
  },
  resolve: updateWorkoutDayMutationResolver,
};

export default updateWorkoutDayMutation;
