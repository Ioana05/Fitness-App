import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import exerciseDifficultyEnumType from "./exerciseDifficultyEnumType.js";

const exerciseInputType = new GraphQLInputObjectType({
  name: "ExerciseInput",
  fields: {
    name: { type: GraphQLString },
    muscleGroup: { type: GraphQLString },
    difficultyLevel: { type: exerciseDifficultyEnumType },
    instructions: { type: GraphQLString },
  },
});

export default exerciseInputType;