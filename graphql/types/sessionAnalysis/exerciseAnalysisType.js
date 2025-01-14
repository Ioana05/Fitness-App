import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from "graphql";


const ExerciseAnalysisType = new GraphQLObjectType({
  name: "ExerciseAnalysis",
  fields: {
    exerciseId: { type: GraphQLInt },
    name: { type: GraphQLString },
    muscleGroups: { type: GraphQLString },
    difficultyLevel: { type: GraphQLString },
    totalOccurrences: { type: GraphQLInt },
    completedOccurrences: { type: GraphQLInt },
    completionRate: { type: GraphQLFloat },
    averagePlanCompletion: { type: GraphQLFloat },
  },
});

export default ExerciseAnalysisType;