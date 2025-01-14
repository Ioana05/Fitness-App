import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from "graphql";

const trainerMetricsType = new GraphQLObjectType({
  name: "TrainingMetrics",
  fields: {
    totalClients: { type: GraphQLInt },
    activeClients: { type: GraphQLInt },
    earnedRevenue: { type: GraphQLFloat },
    projectedRevenue: { type: GraphQLFloat },
    averageClientRetention: { type: GraphQLFloat },
  },
});

export default trainerMetricsType;