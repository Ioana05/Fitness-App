import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import workoutDayInputType from "../../types/workoutDay/workoutDayInputType.js";
import db from "../../../models/index.js";

const createWorkoutDayMutationResolver = async (_, args, context) => {
  const userId = context.user_id;
  const trainer = await db.Trainer.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!trainer) {
    throw new Error("You are not authorized to perform this action!");
  }

  const workoutDay = args.workoutDay;
  const workoutPlan = await db.WorkoutPlan.findByPk(workoutDay.workoutPlanId);

  if (!workoutPlan) {
    throw new Error("Workout plan not found!");
  }

  if (workoutPlan.trainer_id !== trainer.id) {
    throw new Error("You are not authorized to perform this action!");
  }

  const dayNumber = workoutDay.dayNumber;
  if (dayNumber < 1) {
    throw new Error("Day number should be a positive value!");
  }

  const focusArea = workoutDay.focusArea;
  if (!focusArea || focusArea.length < 3) {
    throw new Error("Focus area should have minimum 3 characters!");
  }

  const instructions = workoutDay.instructions;
  if (instructions && instructions.length < 10) {
    throw new Error("Instructions should have minimum 10 characters!");
  }

  const planExercises = workoutDay.exercises;
  // Check if planExercises exists and is an array
  if (!planExercises || !Array.isArray(planExercises)) {
    throw new Error("Exercises must be provided as an array!");
  }

  for (let i = 0; i < planExercises.length; i++) {
    const planExercise = planExercises[i];
    const { exerciseId, sets, repsTarget, restSeconds, orderInWorkout } =
      planExercise;

    const exercise = await db.Exercise.findByPk(exerciseId);
    if (!exercise) {
      throw new Error(`Exercise with id ${exerciseId} does not exist!`);
    }

    if (sets && sets < 0) {
      throw new Error("Number of sets should be a positive value!");
    }

    if (repsTarget && repsTarget < 0) {
      throw new Error("Number of reps should be a positive value!");
    }

    if (restSeconds && restSeconds < 0) {
      throw new Error("Rest in seconds should be a positive value!");
    }

    if (orderInWorkout && orderInWorkout < 1) {
      throw new Error("Order in workout should be a positive value!");
    }
  }

  const createdWorkoutDay = await db.WorkoutDay.create({
    workout_plan_id: workoutDay.workoutPlanId,
    day_number: dayNumber,
    focus_area: focusArea,
    instructions: instructions,
  });

  const planExercisesData = planExercises.map((planExercise) => ({
    workout_day_id: createdWorkoutDay.id,
    exercise_id: planExercise.exerciseId,
    sets: planExercise.sets,
    reps_target: planExercise.repsTarget,
    rest_seconds: planExercise.restSeconds,
    order_in_workout: planExercise.orderInWorkout,
  }));

  await db.PlanExercise.bulkCreate(planExercisesData);

  return createdWorkoutDay; // Changed from workoutDay to createdWorkoutDay
};

const createWorkoutDayMutation = {
    type: workoutDayType,
    args: {
        workoutDay: { type: workoutDayInputType },
    },
    resolve: createWorkoutDayMutationResolver,
};

export default createWorkoutDayMutation;