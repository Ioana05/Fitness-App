import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteWorkoutSessionResolver = async (_, args, context) => {
  //   const isAuthorized = !!context.user_id;

  // if(!isAuthorized) {
  //     return false;
  // }

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id: args.id,
    },
  });

  if (!workoutSession) {
    return false;
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
