import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import bcrypt from "bcrypt";
import workoutPlanInputType from "../../types/workoutPlan/workoutPlanInputType.js";

const createWorkoutPlanMutationResolver = async (
  _,
  { workoutPlan },
  context
) => {
  console.log(db);
  const createdworkoutPlan = await db.WorkoutPlan.create({
    trainer_id: workoutPlan.trainer_id,
    client_id: workoutPlan.client_id,
    name: workoutPlan.name,
    start_date: workoutPlan.start_date,
    end_date: workoutPlan.end_date,
  });
  return createdworkoutPlan;
};

const createWorkoutPlanMutation = {
  type: workoutPlanType,
  args: {
    workoutPlan: { type: workoutPlanInputType },
  },
  resolve: createWorkoutPlanMutationResolver,
};

export default createWorkoutPlanMutation;
