import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

const workoutPlanType = new GraphQLObjectType({
  name: "workoutPlan",
  fields: {
    id: { type: GraphQLInt },
    trainer_id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
  },
});

export default workoutPlanType;
