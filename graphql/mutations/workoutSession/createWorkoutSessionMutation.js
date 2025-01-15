import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";
import workoutSessionInputType from "../../types/workoutSession/workoutSessionInputType.js";

const createWorkoutSessionMutationResolver = async (
  _,
  { workoutSession },
  context
) => {

  const userId = context.user_id;

  const workoutDayId = workoutSession.workoutDayId;
  if (workoutDayId) {
    const workoutDay = await db.WorkoutDay.findByPk(workoutDayId);

    if (!workoutDay) {
      throw new Error("You are not authorized to perform this action!")
    }
  }

  const durationMinutes = workoutSession.durationMinutes;
  if (durationMinutes < 0) {
    throw new Error("Duration of the workout session should be a positive value!")
  }

  const notes = workoutSession.notes;
  if(notes && notes.lenght < 15) {
    throw new Error("Workout session notes should have minimum 15 characters!")
  }

  const sessionExercises = workoutSession.exercises;
  for(let i = 0; i < sessionExercises.length; i++) {
    const sessionExercise = sessionExercises[i];
    const { exerciseId, setsCompleted, repsCompleted, weight, notes } = sessionExercise;
    
    const exercise = await db.Exercise.findByPk(exerciseId);
    if (!exercise) {
      throw new Error(`Exercise with id ${exerciseId} does not exist!`);
    }

    if (setsCompleted < 0) {
      throw new Error("Number of sets completed should be a positive value!");
    }

    if (repsCompleted < 0) {
      throw new Error("Number of reps completed should be a positive value!");
    }

    if (weight < 0) {
      throw new Error("Weight should be a positive value!");
    }

    if (notes && notes.lenght < 10) {
      throw new Error("Exercise notes should have minimum 10 characters!");
    }
  }

  const workoutSessionData = {
    user_id: userId,
    workout_day_id: workoutDayId,
    date: workoutSession.date,
    duration_minutes: durationMinutes,
    notes: notes,
  };

  const createdWorkoutSession = await db.WorkoutSession.create(workoutSessionData);

  const sessionExercisesData = workoutSession.exercises.map((sessionExercise) => {
    return {
      workout_session_id: createdWorkoutSession.id,
      exercise_id: sessionExercise.exerciseId,
      sets_completed: sessionExercise.setsCompleted,
      reps_completed: sessionExercise.repsCompleted,
      weight: sessionExercise.weight,
      notes: sessionExercise.notes,
    };
  });

  await db.SessionExercise.bulkCreate(sessionExercisesData);

  return createdWorkoutSession;
};

const createWorkoutSessionMutation = {
  type: workoutSessionType,
  args: {
    workoutSession: { type: workoutSessionInputType },
  },
  resolve: createWorkoutSessionMutationResolver,
};

export default createWorkoutSessionMutation;
