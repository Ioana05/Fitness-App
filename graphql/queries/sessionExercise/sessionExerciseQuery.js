import { GraphQLInt } from "graphql";
import sessionExerciseType from "../../types/sessionExercise/sessionExerciseType.js";
import db from "../../../models/index.js";

const sessionExerciseQueryResolver = async (_, { id }) => {
    const sessionExercise = await db.SessionExercise.findOne({
        where: {
        id,
        },
    });
    
    if (!sessionExercise) {
        return null;
    }
    
    return sessionExercise;
}

const sessionExerciseQuery = {
    type: sessionExerciseType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: sessionExerciseQueryResolver,
};

export default sessionExerciseQuery;
