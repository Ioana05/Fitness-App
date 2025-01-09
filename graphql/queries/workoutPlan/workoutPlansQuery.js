import { GraphQLList } from "graphql";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import db from "../../../models/index.js";

const workoutPlansQueryResolver = async () => {
  const workoutPlans = await db.WorkoutPlan.findAll();

  return workoutPlans;
};

const workoutPlansQuery = {
  type: new GraphQLList(workoutPlanType),
  resolve: workoutPlansQueryResolver,
};

export default workoutPlansQuery;
