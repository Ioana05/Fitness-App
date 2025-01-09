import graphql from "graphql";
import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSessionType.js";
import workoutSessionInputType from "../../types/workoutSessionInputType.js";

const updateWorkoutSessionMutationResolver = async (_, args) => {
  const id = args.id;

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id,
    },
  });

  if (!workoutSession) {
    return false;
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
