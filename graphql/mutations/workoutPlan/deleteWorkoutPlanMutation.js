import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteWorkoutPlanResolver = async (_, args, context) => {
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    return false;
  }

  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id: args.id,
    },
  });

  console.log(workoutPlan);

  if (!workoutPlan) {
    return false;
  }

  const isSelf = context.user_id === workoutPlan.client_id;
  if (!isSelf) {
    throw new Error("Permission denied");
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
