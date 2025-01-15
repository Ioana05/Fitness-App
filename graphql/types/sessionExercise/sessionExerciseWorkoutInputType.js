import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} from "graphql";
import workoutSessionType from "../workoutSession/workoutSessionType.js";
import exerciseType from "../exercise/exerciseType.js";

const sessionExerciseWorkoutInputType = new GraphQLInputObjectType({
  name: "SessionExerciseWorkoutInput",
  fields: {
    exerciseId: { type: new GraphQLNonNull(GraphQLInt) },
    setsCompleted: { type: new GraphQLNonNull(GraphQLInt) },
    repsCompleted: { type: new GraphQLNonNull(GraphQLInt) },
    weight: { type: new GraphQLNonNull(GraphQLFloat) },
    notes: { type: GraphQLString },
  },
});

export default sessionExerciseWorkoutInputType;
