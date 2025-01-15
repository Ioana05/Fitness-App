import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";

const deleteWorkoutSessionResolver = async (_, args, context) => {
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    throw new Error("You are not authorized to perform this action!");
  }

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id: args.id,
    },
  });

  if (!workoutSession) {
    throw new Error("Workout session not found");
  }

  const isSelf = context.user_id === workoutSession.user_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  await workoutSession.destroy();
  return workoutSession;
};

const deleteWorkoutSessionMutation = {
  type: workoutSessionType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteWorkoutSessionResolver,
};

export default deleteWorkoutSessionMutation;
