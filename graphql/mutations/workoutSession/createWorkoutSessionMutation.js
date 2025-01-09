import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSessionType.js";
import workoutSessionInputType from "../../types/workoutSessionInputType.js";

const createWorkoutSessionMutationResolver = async (
  _,
  { workoutSession },
  context
) => {
  const createdworkoutSession = await db.WorkoutSession.create({
    user_id: workoutSession.user_id,
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
