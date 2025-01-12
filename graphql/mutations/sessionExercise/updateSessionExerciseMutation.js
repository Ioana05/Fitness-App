import sessionExerciseInputType from "../../types/sessionExercise/sessionExerciseInputType.js";
import sessionExerciseType from "../../types/sessionExercise/sessionExerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const updateSessionExerciseMutationResolver = async (
    _,
    args,
    context
    ) => {
    const id = args.id;
    const sessionExercise = await db.SessionExercise.findOne({
        where: {
            id,
        },
    });

    const updatedSessionExercise = await sessionExercise.update({
        workout_session_id: args.sessionExercise.workoutSessionId,
        exercise_id: args.sessionExercise.exerciseId,
        sets_completed: args.sessionExercise.setsCompleted,
        reps_completed: args.sessionExercise.repsCompleted,
        weight: args.sessionExercise.weight,
        notes: args.sessionExercise.notes,
    });

    return updatedSessionExercise;
}

const updateSessionExerciseMutation = {
    type: sessionExerciseType,
    args: {
        id: { type: GraphQLInt },
        sessionExercise: { type: sessionExerciseInputType },
    },
    resolve: updateSessionExerciseMutationResolver,
};

export default updateSessionExerciseMutation;