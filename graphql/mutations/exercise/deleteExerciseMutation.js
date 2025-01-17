import exerciseInputType from "../../types/exercise/exerciseInputType.js";
import exerciseType from "../../types/exercise/exerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const deleteExerciseMutationResolver = async (_, { id }, context) => {
  const isAthorized = !!context.user_id;

  if (!isAthorized) {
    throw new Error("You are not authenticated!");
  }

  const exercise = await db.Exercise.findOne({
    where: {
      id,
    },
  });

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  await exercise.destroy();

  return exercise;
};

const deleteExerciseMutation = {
  type: exerciseType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteExerciseMutationResolver,
};

export default deleteExerciseMutation;
