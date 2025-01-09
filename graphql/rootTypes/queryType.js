import { GraphQLObjectType } from "graphql";

import userQueries from "../queries/user/index.js";
import trainerQueries from "../queries/trainer/index.js";
import workoutPlanQueries from "../queries/workoutPlan/index.js";
import workoutSessionQueries from "../queries/workoutSession/index.js";
import exerciseQueries from "../queries/exercise/index.js";
import workoutDayQueries from "../queries/workoutDay/index.js";
import planExerciseQueries from "../queries/planExercise/index.js";
import sessionExerciseQueries from "../queries/sessionExercise/index.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...trainerQueries,
    ...workoutPlanQueries,
    ...workoutSessionQueries,
    ...exerciseQueries,
    ...workoutDayQueries,
    ...planExerciseQueries,
    ...sessionExerciseQueries,
  },
});

export default queryType;
