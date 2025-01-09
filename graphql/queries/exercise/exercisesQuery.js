import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import exerciseType from "../../types/exercise/exerciseType.js";

const exercisesQueryResolver = async () => {
    const exercises = await db.Exercise.findAll();
    
    return exercises;
}

const exercisesQuery = {
    type: new GraphQLList(exerciseType),
    resolve: exercisesQueryResolver,
};

export default exercisesQuery;