import graphql from "graphql";
import createUserMutation from "../mutations/user/createUserMutation.js";
import updateUserMutation from "../mutations/user/updateUserMutation.js";
import deleteUserMutation from "../mutations/user/deleteUserMutation.js";
import loginMutation from "../mutations/loginMutation.js";
import createTrainerMutation from "../mutations/trainer/createTrainerMutation.js";
import updateTrainerMutation from "../mutations/trainer/updateTrainerMutation.js";
import createWorkoutPlanMutation from "../mutations/workoutPlan/createWorkoutPlanMutation.js";
import deleteTrainerMutation from "../mutations/trainer/deleteTrainer.js";
import updateWorkoutPlanMutation from "../mutations/workoutPlan/updateWorkoutPlan.js";
import deleteWorkoutPlanMutation from "../mutations/workoutPlan/deleteWorkoutPlan.js";
import createWorkoutSessionMutation from "../mutations/workoutSession/createWorkoutSessionMutation.js";
import updateWorkoutSessionMutation from "../mutations/workoutSession/updateWorkoutSession.js";
import deleteWorkoutSessionMutation from "../mutations/workoutSession/deleteWorkoutSession.js";

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
    login: loginMutation,
    createTrainer: createTrainerMutation,
    updateTrainer: updateTrainerMutation,
    deleteTrainer: deleteTrainerMutation,
    createWorkoutPlan: createWorkoutPlanMutation,
    updateWorkoutPlan: updateWorkoutPlanMutation,
    deleteWorkoutPlan: deleteWorkoutPlanMutation,
    // createPost: createPostMutation,
    createWorkoutSession: createWorkoutSessionMutation,
    updateWorkoutSession: updateWorkoutSessionMutation,
    deleteWorkoutSession: deleteWorkoutSessionMutation,
  },
});

export default queryType;
