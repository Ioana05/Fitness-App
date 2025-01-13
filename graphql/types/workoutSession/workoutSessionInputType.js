import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";

const workoutSessionInputType = new GraphQLInputObjectType({
  name: "workoutSessionInput",
  fields: {
    workout_day_id: { type: GraphQLInt },
    date: { type: GraphQLString },
    duration_minutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
  },
});

export default workoutSessionInputType;
