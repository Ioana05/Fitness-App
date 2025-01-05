import { GraphQLInt, GraphQLString, GraphQLInputObjectType } from "graphql";

const workoutSessionInputType = new GraphQLInputObjectType({
  name: "workoutSessionInput",
  fields: {
    user_id: { type: GraphQLInt },
    workout_day_id: { type: GraphQLInt },
    date: { type: GraphQLString },
    duration_minutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
  },
});

export default workoutSessionInputType;
