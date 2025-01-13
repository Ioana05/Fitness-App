import {
  GraphQLObjectType,
  GraphQLFloat,
} from "graphql";
import DateScalar from "../../scalars/dateScalar.js";

const finnancialSummaryType = new GraphQLObjectType({
  name: "FinancialSummary",
  fields: {
    totalRevenue: { type: GraphQLFloat },
    projectedRevenue: { type: GraphQLFloat },
    sessionRate: { type: GraphQLFloat },
    contractEndDate: { type: DateScalar },
  },
});

export default finnancialSummaryType;