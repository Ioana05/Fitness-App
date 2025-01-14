import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from "graphql";
import TrainingPatternType from "./trainingPatternType.js";
import MuscleGroupStatsType from "./muscleGroupStatsType.js";
import ExerciseAnalysisType from "./exerciseAnalysisType.js";

const SessionAnalysisType = new GraphQLObjectType({
  name: "SessionAnalysis",
  fields: {
    trainingPattern: { type: TrainingPatternType },
    muscleGroups: { type: new GraphQLList(MuscleGroupStatsType) },
    exercises: { type: new GraphQLList(ExerciseAnalysisType) },
  },
});

export default SessionAnalysisType;