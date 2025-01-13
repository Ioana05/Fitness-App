import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteWorkoutSessionResolver = async (_, args, context) => {
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    return false;
  }

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id: args.id,
    },
  });

  if (!workoutSession) {
    return false;
  }

  const isSelf = context.user_id === workoutSession.user_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  await workoutSession.destroy();
  return true;
};

const deleteWorkoutSessionMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteWorkoutSessionResolver,
};

export default deleteWorkoutSessionMutation;
