import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLNonNull } from "graphql";
import goalTypeEnum from "./goalEnumType.js";
import statusType from "./statusEnumType.js";
import dateScalar from "../../scalars/dateScalar.js";

const planGoalInputType = new GraphQLInputObjectType({
  name: "PlanGoalInput",
  fields: {
    workoutPlanId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    goalType: { type: new GraphQLNonNull(goalTypeEnum) },
    measurementType: { type: new GraphQLNonNull(GraphQLString) },
    targetValue: { type: new GraphQLNonNull(GraphQLFloat) },
    initialValue: { type: new GraphQLNonNull(GraphQLFloat) },
    deadline: { type: new GraphQLNonNull(dateScalar) },
  },
});

export default planGoalInputType;
