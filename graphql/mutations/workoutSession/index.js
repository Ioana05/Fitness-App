import deleteWorkoutSessionMutation from "./deleteWorkoutSession.js";
import createWorkoutSessionMutation from "../workoutSession/createWorkoutSessionMutation.js";
import updateWorkoutSessionMutation from "../workoutSession/updateWorkoutSessionMutation.js";

export default {
  deleteWorkoutSession: deleteWorkoutSessionMutation,
  createWorkoutSession: createWorkoutSessionMutation,
  updateWorkoutSession: updateWorkoutSessionMutation,
};
