import planExerciseInputType from "../../types/planExercise/planExerciseInputType.js";
import planExerciseType from "../../types/planExercise/planExerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const updatePlanExerciseMutationResolver = async (
    _,
    args,
    context
    ) => {
    const id = args.id;
    const planExercise = await db.PlanExercise.findOne({
        where: {
            id,
        },
    });

    const updatedPlanExercise = await planExercise.update({
      workout_day_id: args.planExercise.workoutDayId,
      exercise_id: args.planExercise.exerciseId,
      sets: args.planExercise.sets,
      reps_target: args.planExercise.repsTarget,
      rest_seconds: args.planExercise.restSeconds,
      order_in_workout: args.planExercise.orderInWorkout,
    });

    return updatedPlanExercise;
}

const updatePlanExerciseMutation = {
    type: planExerciseType,
    args: {
        id: { type: GraphQLInt },
        planExercise: { type: planExerciseInputType },
    },
    resolve: updatePlanExerciseMutationResolver,
};

export default updatePlanExerciseMutation;