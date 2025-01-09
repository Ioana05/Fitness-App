import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import trainerType from "../trainer/trainerType.js";
import userType from "../user/userType.js";

const workoutPlanType = new GraphQLObjectType({
  name: "workoutPlan",
  fields: {
    id: { type: GraphQLInt },
    trainer: {
      type: trainerType,
      resolve: async (workoutPlan) => {
        const user = await workoutPlan.getTrainer();

        return user;
      },
    },
    client: {
      type: userType,
      resolve: async (workoutPlan) => {
        const user = await workoutPlan.getClient();

        return user;
      },
    },
    name: { type: GraphQLString },
    startDate: {
      type: GraphQLString,
      resolve: (workoutPlan) => workoutPlan.start_date,
    },
    endDate: {
      type: GraphQLString,
      resolve: (workoutPlan) => workoutPlan.end_date,
    },
  },
});

export default workoutPlanType;
