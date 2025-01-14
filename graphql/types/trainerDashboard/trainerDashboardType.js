import {
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import trainerMetricsType from "./trainerMetricsType.js";
import ClientAnalysisType from "./clientAnalysisType.js";

const TrainerDashboardType = new GraphQLObjectType({
  name: "TrainerDashboard",
  fields: {
    trainerMetrics: { type: trainerMetricsType },
    clientsAnalysis: { type: new GraphQLList(ClientAnalysisType) },
  },
});

export default TrainerDashboardType;
