import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from "graphql";

const TrainingPatternType = new GraphQLObjectType({
  name: "TrainingPattern",
  fields: {
    avgSessionsPerWeek: { type: GraphQLFloat },
    avgSessionDuration: { type: GraphQLInt },
    mostFrequentWeekday: { type: GraphQLString },
    avgRestDaysBetweenSessions: { type: GraphQLFloat },
  },
});

export default TrainingPatternType;