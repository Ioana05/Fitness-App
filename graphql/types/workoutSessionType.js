import { GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";

const workoutSessionType = new GraphQLObjectType({
  name: "workoutSession",
  fields: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    workout_day_id: { type: GraphQLInt },
    date: { type: GraphQLString },
    duration_minutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
  },
});

export default workoutSessionType;
