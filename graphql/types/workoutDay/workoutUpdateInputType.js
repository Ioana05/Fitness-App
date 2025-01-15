import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import planExerciseUpdateInputType from "../planExercise/planExerciseUpdateInputType.js";

const workoutDayUpdateInputType = new GraphQLInputObjectType({
  name: "WorkoutDayUpdateInput",
  fields: {
    dayNumber: { type: GraphQLInt },
    focusArea: { type: GraphQLString },
    instructions: { type: GraphQLString },
    exercises: {
      type: new GraphQLList(new GraphQLNonNull(planExerciseUpdateInputType)),
    },
  },
});

export default workoutDayUpdateInputType;
