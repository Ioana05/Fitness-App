import sessionExerciseType from "../../types/sessionExercise/sessionExerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const deleteSessionExerciseMutationResolver = async (
    _,
    { id },
    context
    ) => {
    const sessionExercise = await db.SessionExercise.findOne({
        where: {
            id,
        },
    });

    if (!sessionExercise) {
        return null;
    }

    await sessionExercise.destroy();

    return sessionExercise;
}

const deleteSessionExerciseMutation = {
    type: sessionExerciseType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteSessionExerciseMutationResolver,
};

export default deleteSessionExerciseMutation;