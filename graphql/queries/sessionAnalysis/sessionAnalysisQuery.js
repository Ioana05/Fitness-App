import { GraphQLInt } from "graphql";
import sessionAnalysisType from "../../types/sessionAnalysis/sessionAnalysisType.js";
import sessionAnalysisService from "../../../core/services/sessionAnalysisService.js";

const sessionAnalysisQueryResolver = async (_, { userId, timeRange }) => {
  try {
    const analysis = await sessionAnalysisService.getSessionAnalysis(
      userId,
      timeRange
    );
    return analysis;
  } catch (error) {
    console.error("Error analyzing sessions:", error);
    throw error;
  }
};

const sessionAnalysisQuery = {
  type: sessionAnalysisType,
  args: {
    userId: { type: GraphQLInt },
    timeRange: { type: GraphQLInt }, // in days
  },
  resolve: sessionAnalysisQueryResolver,
};

export default sessionAnalysisQuery;
