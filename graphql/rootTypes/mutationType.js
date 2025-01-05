import graphql from "graphql";
import createUserMutation from "../mutations/createUserMutation.js";
import updateUserMutation from "../mutations/updateUserMutation.js";
import deleteUserMutation from "../mutations/deleteUserMutation.js";
import loginMutation from "../mutations/loginMutation.js";
import createPostMutation from "../mutations/createPostMutation.js";
import createTrainerMutation from "../mutations/createTrainerMutation.js";
import createWorkoutPlanMutation from "../mutations/createWorkoutPlanMutation.js";
import createWorkoutSessionMutation from "../mutations/createWorkoutSessionMutation.js";

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
    login: loginMutation,
    createTrainer: createTrainerMutation,
    createWorkoutPlan: createWorkoutPlanMutation,
    createPost: createPostMutation,
    createWorkoutSession: createWorkoutSessionMutation,
  },
});

export default queryType;
