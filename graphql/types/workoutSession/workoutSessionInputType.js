import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import sessionExerciseWorkoutType from "../sessionExercise/sessionExerciseWorkoutInputType.js";

const workoutSessionInputType = new GraphQLInputObjectType({
  name: "workoutSessionInput",
  fields: {
    workoutDayId: { type: GraphQLInt },
    date: { type: new GraphQLNonNull(GraphQLString) },
    durationMinutes: { type: new GraphQLNonNull(GraphQLInt) },
    notes: { type: GraphQLString },
    exercises: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(sessionExerciseWorkoutType)))}
  },
});

export default workoutSessionInputType;
