import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import exerciseDifficultyEnumType from "./exerciseDifficultyEnumType";

const exerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    muscleGroup: { type: GraphQLString },
    difficultyLevel: { type: exerciseDifficultyEnumType },
    instructions: { type: GraphQLString }
  },
});

export default exerciseType;