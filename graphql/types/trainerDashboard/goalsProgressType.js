import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import DateScalar from "../../scalars/dateScalar.js";

const goalsProgressType = new GraphQLObjectType({
  name: "GoalsProgress",
  fields: {
    totalGoals: { type: GraphQLInt },
    completedGoals: { type: GraphQLInt },
    onTrackGoals: { type: GraphQLInt },
    atRiskGoals: { type: GraphQLInt },
    completionRate: { type: GraphQLFloat },
  },
});

export default goalsProgressType;