import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import exerciseDifficultyEnumType from "./exerciseDifficultyEnumType.js";

const exerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    muscleGroup: {
      type: GraphQLString,
      resolve: (exercise) => exercise.muscle_group,
    },
    difficultyLevel: {
      type: exerciseDifficultyEnumType,
      resolve: (exercise) => exercise.difficulty_level,
    },
    instructions: { type: GraphQLString },
  },
});

export default exerciseType;
