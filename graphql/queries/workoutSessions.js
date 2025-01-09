import { GraphQLList } from "graphql";
import workoutSessionType from "../types/workoutSessionType.js";
import db from "../../models/index.js";

const workoutSessionsQueryResolver = async () => {
  const workoutSessions = await db.WorkoutSession.findAll();

  return workoutSessions;
};

const workoutSessionsQuery = {
  type: new GraphQLList(workoutSessionType),
  resolve: workoutSessionsQueryResolver,
};

export default workoutSessionsQuery;
