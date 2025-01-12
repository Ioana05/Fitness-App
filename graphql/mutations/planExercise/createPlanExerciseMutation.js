import planExerciseInputType from "../../types/planExercise/planExerciseInputType.js";
import planExerciseType from "../../types/planExercise/planExerciseType.js";
import db from "../../../models/index.js";

const createPlanExerciseMutationResolver = async (
    _,
    args,
    context
    ) => {
    const planExercise = await db.PlanExercise.create({
        workout_day_id: args.planExercise.workoutDayId,
        exercise_id: args.planExercise.exerciseId,
        sets: args.planExercise.sets,
        reps_target: args.planExercise.repsTarget,
        rest_seconds: args.planExercise.restSeconds,
        order_in_workout: args.planExercise.orderInWorkout,
    });

    return planExercise;
}

const createPlanExerciseMutation = {
    type: planExerciseType,
    args: {
        planExercise: { type: planExerciseInputType },
    },
    resolve: createPlanExerciseMutationResolver,
};

export default createPlanExerciseMutation;