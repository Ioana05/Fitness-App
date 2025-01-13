import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import DateScalar from "../../scalars/dateScalar.js";


const sessionSummaryType = new GraphQLObjectType({
    name: "SessionsSummary",
    fields: {
        totalSessions: { type: GraphQLInt },
        completedSessions: { type: GraphQLInt },
        remainingSessions: { type: GraphQLInt },
        completionRate: { type: GraphQLFloat },
        averageSessionDuration: { type: GraphQLInt },
        lastSessionDate: { type: DateScalar },
    }
});

export default sessionSummaryType;
