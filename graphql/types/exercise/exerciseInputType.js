import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import exerciseDifficultyEnumType from "./exerciseDifficultyEnumType.js";

const exerciseInputType = new GraphQLInputObjectType({
  name: "ExerciseInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    muscleGroup: { type: new GraphQLNonNull(GraphQLString) },
    difficultyLevel: { type: new GraphQLNonNull(exerciseDifficultyEnumType) },
    instructions: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default exerciseInputType;