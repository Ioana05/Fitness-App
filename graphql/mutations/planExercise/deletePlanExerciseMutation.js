import planExerciseType from "../../types/planExercise/planExerciseType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const deletePlanExerciseMutationResolver = async (
    _,
    { id },
    context
    ) => {
    const planExercise = await db.PlanExercise.findOne({
        where: {
            id,
        },
    });

    if (!planExercise) {
        return null;
    }

    await planExercise.destroy();

    return planExercise;
}

const deletePlanExerciseMutation = {
    type: planExerciseType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deletePlanExerciseMutationResolver,
};

export default deletePlanExerciseMutation;