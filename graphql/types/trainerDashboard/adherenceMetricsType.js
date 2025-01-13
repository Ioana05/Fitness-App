import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
} from "graphql";
import DateScalar from "../../scalars/dateScalar.js";

const adherenceMetricsType = new GraphQLObjectType({
  name: "AdherenceMetrics",
  fields: {
    avgSessionsPerWeek: { type: GraphQLFloat },
    lastFeedback: { type: GraphQLString },
    lastFeedbackDate: { type: DateScalar },
  },
});

export default adherenceMetricsType;