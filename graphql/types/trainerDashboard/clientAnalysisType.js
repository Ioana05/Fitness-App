import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from "graphql";
import userType from "../user/userType.js";
import sessionSummaryType from "./sessionSummaryType.js";
import goalsProgressType from "./goalsProgressType.js";
import finnancialSummaryType from "./finnancialSummaryType.js";
import adherenceMetricsType from "./adherenceMetricsType.js";
import clientEnumType from "./clientEnumType.js";

const ClientAnalysisType = new GraphQLObjectType({
  name: "ClientAnalysis",
  fields: {
    client: { type: userType },
    clientType: { type: clientEnumType },
    sessionSummary: { type: sessionSummaryType },
    goalsProgress: { type: goalsProgressType },
    finnancialSummary: { type: finnancialSummaryType },
    adherenceMetrics: { type: adherenceMetricsType },
  }
});

export default ClientAnalysisType;