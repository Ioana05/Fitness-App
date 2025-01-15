import graphql from "graphql";
import db from "../../../models/index.js";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";
import workoutSessionUpdateInputType from "../../types/workoutSession/workoutSessionUpdateInputType.js";

const updateWorkoutSessionMutationResolver = async (_, args, context) => {
  const id = args.id;

  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id,
    },
  });

  if (!workoutSession) {
    throw new Error("Workout session not found");
  }

  const isSelf = context.user_id === workoutSession.user_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  const inputWorkoutSession = args.workoutSession;
  console.log(inputWorkoutSession);
  if (Object.values(inputWorkoutSession).every((value) => value === null)) {
    return workoutSession;
  }

  const durationMinutes = inputWorkoutSession.durationMinutes;
  if (durationMinutes && durationMinutes < 0) {
    throw new Error("Duration of the workout session should be a positive value!");
  }

  const notes = inputWorkoutSession.notes;
  if (notes && notes.length < 15) {
    throw new Error("Workout session notes should have minimum 15 characters!");
  }

  const date = inputWorkoutSession.date;
  if (date) {
    const dateObject = new Date(date);
    if (dateObject.toString() === "Invalid Date") {
      throw new Error("Invalid date format!");
    }
  } else if (date === "") {
    throw new Error("Date cannot be empty!");
  }

  // Filter out null values first
  const filteredWorkoutSession = Object.keys(inputWorkoutSession).reduce(
    (acc, key) => {
      if (
        inputWorkoutSession[key] !== null &&
        inputWorkoutSession[key] !== undefined
      ) {
        acc[key] = inputWorkoutSession[key];
      }
      return acc;
    },
    {}
  );

  // Convert keys to snake_case
  const snakeCaseWorkoutSession = Object.keys(filteredWorkoutSession).reduce(
    (acc, key) => {
      acc[key.replace(/([A-Z])/g, "_$1").toLowerCase()] =
        filteredWorkoutSession[key];
      return acc;
    },
    {}
  );

  let updatedWorkoutSession;

  if (Object.keys(snakeCaseWorkoutSession).length > 0) {
    updatedWorkoutSession = await workoutSession.update(
      snakeCaseWorkoutSession,
      {
        fields: Object.keys(snakeCaseWorkoutSession),
      }
    );
  } else {
    updatedWorkoutSession = workoutSession;
  }

  const sessionExercises = inputWorkoutSession.exercises;
  if (sessionExercises) {
    for (let i = 0; i < sessionExercises.length; i++) {
      const sessionExercise = sessionExercises[i];
      const { exerciseId, setsCompleted, repsCompleted, weight, notes } =
        sessionExercise;

      if (exerciseId) {
        const exercise = await db.Exercise.findByPk(exerciseId);
        if (!exercise) {
          throw new Error(`Exercise with id ${exerciseId} does not exist!`);
        }
      }

      if (setsCompleted && setsCompleted < 0) {
        throw new Error("Number of sets completed should be a positive value!");
      }

      if (repsCompleted && repsCompleted < 0) {
        throw new Error("Number of reps completed should be a positive value!");
      }

      if (weight && weight < 0) {
        throw new Error("Weight should be a positive value!");
      }

      if (notes && notes.length < 10) {
        throw new Error("Exercise notes should have minimum 10 characters!");
      }
    }
  } else {
    return updatedWorkoutSession;
  }

  const sessionExercisesData = sessionExercises.map((sessionExercise) => {
    // Filter out null values first
    const filteredSessionExercise = Object.keys(sessionExercise).reduce(
      (acc, key) => {
        if (sessionExercise[key] !== null) {
          acc[key] = sessionExercise[key];
        }
        return acc;
      },
      {}
    );

    // Convert keys to snake_case
    const snakeCaseSessionExercise = Object.keys(
      filteredSessionExercise
    ).reduce((acc, key) => {
      acc[key.replace(/([A-Z])/g, "_$1").toLowerCase()] =
        filteredSessionExercise[key];
      return acc;
    }, {});

    return {
      workout_session_id: updatedWorkoutSession.id,
      ...snakeCaseSessionExercise,
    };
  });

  await db.SessionExercise.bulkCreate(sessionExercisesData, {
    updateOnDuplicate: ["sets_completed", "reps_completed", "weight", "notes"],
  });

  return updatedWorkoutSession;
};

const updateWorkoutSessionMutation = {
  type: workoutSessionType,
  args: {
    id: { type: graphql.GraphQLInt },
    workoutSession: { type: workoutSessionUpdateInputType },
  },
  resolve: updateWorkoutSessionMutationResolver,
};

export default updateWorkoutSessionMutation;
