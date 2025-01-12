import { GraphQLInt } from "graphql";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import db from "../../../models/index.js";

const workoutPlanQueryResolver = async (_, { id }) => {
  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id,
    },
  });

  if (!workoutPlan) {
    return null;
  }

  return workoutPlan;
};

const workoutPlanQuery = {
  type: workoutPlanType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: workoutPlanQueryResolver,
};

export default workoutPlanQuery;
