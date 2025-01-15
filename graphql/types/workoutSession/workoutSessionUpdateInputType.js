import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import sessionExerciseWorkoutUpdateInputType from "../sessionExercise/sessionExerciseWorkoutUpdateInputType";

const workoutSessionUpdateInputType = new GraphQLInputObjectType({
  name: "workoutSessionUpdateInput",
  fields: {
    date: { type: GraphQLString },
    durationMinutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
    exercises: {
      type: new GraphQLList(
          new GraphQLNonNull(sessionExerciseWorkoutUpdateInputType)
      ),
    },
  },
});

export default workoutSessionUpdateInputType;
