import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";

const workoutPlanUpdateInputType = new GraphQLInputObjectType({
  name: "workoutPlanUpdateInput",
  fields: {
    name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
  },
});

export default workoutPlanUpdateInputType;
