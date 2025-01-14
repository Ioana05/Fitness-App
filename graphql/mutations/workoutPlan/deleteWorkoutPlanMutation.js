import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";

const deleteWorkoutPlanResolver = async (_, args, context) => {
  //   const isAuthorized = !!context.user_id;

  // if(!isAuthorized) {
  //     return false;
  // }

  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id: args.id,
    },
  });

  if (!workoutPlan) {
    throw new Error("Workout plan not found");
  }

  const userId = context.user_id;
   
  if (workoutPlan.client_id !== userId) {
    throw new Error("You are not authorized to perform this action");
  }

  await workoutPlan.destroy();
  return workoutPlan;
};

const deleteWorkoutPlanMutation = {
  type: workoutPlanType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteWorkoutPlanResolver,
};

export default deleteWorkoutPlanMutation;
