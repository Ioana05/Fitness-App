import graphql from "graphql";
import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import workoutPlanInputType from "../../types/workoutPlan/workoutPlanInputType.js";

const updateWorkoutPlanMutationResolver = async (_, args, context) => {
  const id = args.id;

  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id,
    },
  });

  if (!workoutPlan) {
    return false;
  }
  console.log(context.user_id);
  console.log(workoutPlan.client_id);
  const isSelf = context.user_id === workoutPlan.client_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }
  const updatedworkoutPlan = await workoutPlan.update({
    ...args.workoutPlan,
  });

  return updatedworkoutPlan;
};

const updateWorkoutPlanMutation = {
  type: workoutPlanType,
  args: {
    id: { type: graphql.GraphQLInt },
    workoutPlan: { type: workoutPlanInputType },
  },
  resolve: updateWorkoutPlanMutationResolver,
};

export default updateWorkoutPlanMutation;
