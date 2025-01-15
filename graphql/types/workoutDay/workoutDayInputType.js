import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import planExerciseInputType from "../planExercise/planExerciseUpdateInputType.js";

const workoutDayInputType = new GraphQLInputObjectType({
  name: "WorkoutDayInput",
  fields: {
    workoutPlanId: { type: new GraphQLNonNull(GraphQLInt) },
    dayNumber: { type: new GraphQLNonNull(GraphQLInt) },
    focusArea: { type: new GraphQLNonNull(GraphQLString) },
    instructions: { type: GraphQLString },
    exercises: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(planExerciseInputType))
      ),
    },
  },
});

export default workoutDayInputType;
