import { GraphQLInt } from "graphql";
import db from "../../models/index.js";
import workoutPlanType from "../types/workoutPlanType.js";

const workoutPlanQueryResolver = async (_, { id }) => {
  const workoutPlan = await db.workoutPlan.findOne({
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
