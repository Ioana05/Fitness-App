import graphql from "graphql";

import userMutations from '../mutations/user/index.js';
import trainerMutations from '../mutations/trainer/index.js';
import workoutPlanMutations from '../mutations/workoutPlan/index.js';
import workoutSessionMutations from '../mutations/workoutSession/index.js';
import trainerClientMutations from "../mutations/trainerClient/index.js";
import exerciseMutations from "../mutations/exercise/index.js";

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...trainerMutations,
    ...workoutPlanMutations,
    ...workoutSessionMutations,
    ...trainerClientMutations,
    ...exerciseMutations,
  },
});

export default queryType;
