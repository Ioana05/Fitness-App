import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLString,
} from "graphql";
import exerciseDifficultyEnumType from "./exerciseDifficultyEnumType.js";

const exerciseInputUpdateType = new GraphQLInputObjectType({
    name: "ExerciseUpdateInput",
    fields: {
        name: { type: GraphQLString },
        muscleGroup: { type: GraphQLString },
        difficultyLevel: { type: exerciseDifficultyEnumType },
        instructions: { type: GraphQLString },
    },
});

export default exerciseInputUpdateType;
