import { GraphQLList } from "graphql";
import db from "../../models/index.js";
import workoutPlanType from "../types/workoutPlanType.js";

const workoutPlansQueryResolver = async () => {
  const workoutPlans = await db.workoutPlan.findAll();

  return workoutPlans;
};

const workoutPlansQuery = {
  type: new GraphQLList(workoutPlanType),
  resolve: workoutPlansQueryResolver,
};

export default workoutPlansQuery;
