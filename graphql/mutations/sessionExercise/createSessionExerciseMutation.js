import sessionExerciseInputType from "../../types/sessionExercise/sessionExerciseInputType.js";
import sessionExerciseType from "../../types/sessionExercise/sessionExerciseType.js";
import db from "../../../models/index.js";

const createSessionExerciseMutationResolver = async (
    _,
    args,
    context
    ) => {
    const sessionExercise = await db.SessionExercise.create({
        workout_session_id: args.sessionExercise.workoutSessionId,
        exercise_id: args.sessionExercise.exerciseId,
        sets_completed: args.sessionExercise.setsCompleted,
        reps_completed: args.sessionExercise.repsCompleted,
        weight: args.sessionExercise.weight,
        notes: args.sessionExercise.notes,
    });
    
    return sessionExercise;
}

const createSessionExerciseMutation = {
    type: sessionExerciseType,
    args: {
        sessionExercise: { type: sessionExerciseInputType },
    },
    resolve: createSessionExerciseMutationResolver,
};

export default createSessionExerciseMutation;