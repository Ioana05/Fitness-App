import graphql from "graphql";

import userMutations from "../mutations/user/index.js";
import trainerMutations from "../mutations/trainer/index.js";
import workoutPlanMutations from "../mutations/workoutPlan/index.js";
import workoutSessionMutations from "../mutations/workoutSession/index.js";
import trainerClientMutations from "../mutations/trainerClient/index.js";
import loginMutation from "../mutations/login/index.js";
import exerciseMutations from "../mutations/exercise/index.js";
import planGoalMutations from "../mutations/planGoal/index.js";
import workoutDayMutations from "../mutations/workoutDay/index.js";
import planExerciseMutations from "../mutations/planExercise/index.js";
import sessionExerciseMutations from "../mutations/sessionExercise/index.js";

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...trainerMutations,
    ...workoutPlanMutations,
    ...workoutSessionMutations,
    ...trainerClientMutations,
    ...loginMutation,
    ...trainerClientMutations,
    ...exerciseMutations,
    ...planGoalMutations,
    ...workoutDayMutations,
    ...planExerciseMutations,
    ...sessionExerciseMutations,
  },
});

export default queryType;
