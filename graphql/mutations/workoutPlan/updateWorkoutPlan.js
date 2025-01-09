import graphql from "graphql";
import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlanType.js";
import workoutPlanInputType from "../../types/workoutPlanInputType.js";

const updateWorkoutPlanMutationResolver = async (_, args) => {
  const id = args.id;

  const workoutPlan = await db.workoutPlan.findOne({
    where: {
      id,
    },
  });

  if (!workoutPlan) {
    return false;
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
