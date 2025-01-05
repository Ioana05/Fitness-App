import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";

const workoutPlanInputType = new GraphQLInputObjectType({
  name: "workoutPlanInput",
  fields: {
    trainer_id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
  },
});

export default workoutPlanInputType;
