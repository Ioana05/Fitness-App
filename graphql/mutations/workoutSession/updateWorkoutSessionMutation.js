import graphql from "graphql";
import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";
import workoutSessionInputType from "../../types/workoutSession/workoutSessionInputType.js";

const updateWorkoutSessionMutationResolver = async (_, args, context) => {
  const id = args.id;

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id,
    },
  });

  if (!workoutSession) {
    return false;
  }
  const isSelf = context.user_id === workoutSession.user_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }
  const updatedworkoutSession = await workoutSession.update({
    ...args.workoutSession,
  });

  return updatedworkoutSession;
};

const updateWorkoutSessionMutation = {
  type: workoutSessionType,
  args: {
    id: { type: graphql.GraphQLInt },
    workoutSession: { type: workoutSessionInputType },
  },
  resolve: updateWorkoutSessionMutationResolver,
};

export default updateWorkoutSessionMutation;
