import exerciseInputUpdateType from "../../types/exercise/exerciseUpdateInputType.js";
import exerciseType from "../../types/exercise/exerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt, GraphQLNonNull } from "graphql";

const updateExerciseMutationResolver = async (_, args, context) => {
  const isAthorized = !!context.user_id;

  if (!isAthorized) {
    throw new Error("You are not authenticated!");
  }

  const id = args.id;
  const inputExercise = args.exercise; // Get the input data

  const exercise = await db.Exercise.findOne({
    where: {
      id,
    },
  });

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  const name = inputExercise.name;
    if (name && name.length < 3) {
        throw new Error("Exercise name must be at least 3 characters long");
    }

    const muscleGroup = inputExercise.muscleGroup;
    if (muscleGroup && muscleGroup.length < 3) {
        throw new Error("Muscle group must be at least 3 characters long");
    }

    const instructions = inputExercise.instructions;
    if (instructions && instructions.length < 3) {
        throw new Error("Instructions must be at least 3 characters long");
    }

  // Filter out null values from the input exercise
  const nonNullValues = Object.entries(inputExercise).reduce(
    (acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  // Convert keys to snake_case
  const exerciseData = Object.entries(nonNullValues).reduce(
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

  console.log(exerciseData);

  const updatedExercise = await exercise.update(exerciseData);

  return updatedExercise;
};

const updateExerciseMutation = {
  type: exerciseType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    exercise: { type: exerciseInputUpdateType },
  },
  resolve: updateExerciseMutationResolver,
};

export default updateExerciseMutation;
