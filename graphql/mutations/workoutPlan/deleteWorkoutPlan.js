import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteWorkoutPlanResolver = async (_, args, context) => {
  //   const isAuthorized = !!context.user_id;

  // if(!isAuthorized) {
  //     return false;
  // }

  const workoutPlan = await db.workoutPlan.findOne({
    where: {
      id: args.id,
    },
  });

  if (!workoutPlan) {
    return false;
  }

  await workoutPlan.destroy();
  return true;
};

const deleteWorkoutPlanMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteWorkoutPlanResolver,
};

export default deleteWorkoutPlanMutation;
