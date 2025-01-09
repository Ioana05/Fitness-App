import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutPlanType from "../workoutPlan/workoutPlanType.js";

const workoutDayType = new GraphQLObjectType({
  name: "WorkoutDay",
  fields: {
    id: { type: GraphQLInt },
    workoutPlan: {
      type: workoutPlanType,
      resolve: async (workoutDay) => {
        // If the workout plan is already loaded
        if (workoutDay.WorkoutPlan) {
          return workoutDay.WorkoutPlan;
        }
        // If we need to load it
        return await workoutDay.getWorkoutPlan();
      },
    },
    dayNumber: {
      type: GraphQLInt,
      resolve: (workoutDay) => workoutDay.day_number,
    },
    focusArea: {
      type: GraphQLString,
      resolve: (workoutDay) => workoutDay.focus_area,
    },
    instructions: {
      type: GraphQLString,
      resolve: (workoutDay) => workoutDay.instructions,
    },
  },
});

export default workoutDayType;
