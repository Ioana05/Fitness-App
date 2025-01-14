import exerciseInputType from "../../types/exercise/exerciseInputType.js";
import exerciseType from "../../types/exercise/exerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const updateExerciseMutationResolver = async (
    _,
    args,
    context
    ) => {
    const id = args.id;
    const exercise = await db.Exercise.findOne({
        where: {
            id,
        },
    });

    const updatedExercise = await exercise.update({
        ...args.exercise,
    });

    return updatedExercise;
}

const updateExerciseMutation = {
    type: exerciseType,
    args: {
        id: { type: GraphQLInt },
        exercise: { type: exerciseInputType },
    },
    resolve: updateExerciseMutationResolver,
};

export default updateExerciseMutation;