import { GraphQLList } from "graphql";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import db from "../../../models/index.js";

const workoutPlansQueryResolver = async (_, n, context) => {
  // const workoutPlans = await db.WorkoutPlan.findAll();

  const user_id = context.user_id;
  const workoutPlans = await db.WorkoutPlan.findAll({
    where: {
      client_id: user_id,
    },
  });

  return workoutPlans;
};

const workoutPlansQuery = {
  type: new GraphQLList(workoutPlanType),
  resolve: workoutPlansQueryResolver,
};

export default workoutPlansQuery;
