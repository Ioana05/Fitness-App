import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
} from "graphql";
import workoutPlanType from "../workoutPlan/workoutPlanType.js";
import goalType from "./goalEnumType.js";
import dateScalar from "../../scalars/dateScalar.js";
import statusType from "./statusEnumType.js";

const planGoalType = new GraphQLObjectType({
  name: "PlanGoal",
  fields: {
    id: { type: GraphQLInt },
    workoutPlan: {
      type: workoutPlanType,
      resolve: async (planGoal) => {
        const workoutPlan = await planGoal.getWorkoutPlan();
        return workoutPlan;
      },
    },
    name: { type: GraphQLString },
    goalType: {
      type: goalType,
      resolve: (planGoal) => {
        return planGoal.goal_type;
      },
    },
    measurementType: {
      type: GraphQLString,
      resolve: (planGoal) => {
        return planGoal.measurement_type;
      },
    },
    targetValue: {
      type: GraphQLFloat,
      resolve: (planGoal) => {
        return planGoal.target_value;
      },
    },
    initialValue: {
      type: GraphQLFloat,
      resolve: (planGoal) => {
        return planGoal.initial_value;
      },
    },
    deadline: { type: dateScalar },
    status: { type: statusType },
  },
});

export default planGoalType;
