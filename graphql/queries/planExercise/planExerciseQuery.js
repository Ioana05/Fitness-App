import { GraphQLInt } from "graphql";
import planExerciseType from "../../types/planExercise/planExerciseType.js";
import db from "../../../models/index.js";

const planExerciseQueryResolver = async (_, { id }) => {
    const planExercise = await db.PlanExercise.findOne({
        where: {
        id,
        },
    });
    
    if (!planExercise) {
        return null;
    }
    
    return planExercise;
};

const planExerciseQuery = {
    type: planExerciseType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: planExerciseQueryResolver,
};

export default planExerciseQuery;
