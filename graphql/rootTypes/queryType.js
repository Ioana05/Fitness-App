import { GraphQLObjectType } from "graphql";
import userQuery from "../queries/userQuery.js";
import usersQuery from "../queries/usersQuery.js";
import trainerQuery from "../queries/trainerQuery.js";
import trainersQuery from "../queries/trainersQuery.js";
import workoutPlanQuery from "../queries/workoutPlanQuery.js";
import workoutPlansQuery from "../queries/workoutPlansQuery.js";
import workoutSessionQuery from "../queries/workoutSession.js";
import workoutSessionsQuery from "../queries/workoutSessions.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: userQuery,
    users: usersQuery,
    // post: postQuery,
    trainer: trainerQuery,
    trainers: trainersQuery,
    workoutPlan: workoutPlanQuery,
    workoutPlans: workoutPlansQuery,
    workoutSession: workoutSessionQuery,
    workoutSessions: workoutSessionsQuery,
  },
});

export default queryType;
