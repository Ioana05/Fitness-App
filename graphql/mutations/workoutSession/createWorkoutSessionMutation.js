import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";
import workoutSessionInputType from "../../types/workoutSession/workoutSessionInputType.js";

const createWorkoutSessionMutationResolver = async (
  _,
  { workoutSession },
  context
) => {
  console.log(db);
  const createdworkoutSession = await db.WorkoutSession.create({
    user_id: context.user_id,
    workout_day_id: workoutSession.workout_day_id,
    date: workoutSession.date,
    duration_minutes: workoutSession.duration_minutes,
    notes: workoutSession.notes,
  });
  return createdworkoutSession;
};

const createWorkoutSessionMutation = {
  type: workoutSessionType,
  args: {
    workoutSession: { type: workoutSessionInputType },
  },
  resolve: createWorkoutSessionMutationResolver,
};

export default createWorkoutSessionMutation;
