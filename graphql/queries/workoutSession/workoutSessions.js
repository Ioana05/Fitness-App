import { GraphQLList, GraphQLInt } from "graphql";
import workoutSessionType from "../../types/workoutSession/workoutSessionType.js";
import db from "../../../models/index.js";

const workoutSessionsQueryResolver = async (_, n, context) => {
  const user_id = context.user_id;
  const workoutSessions = await db.WorkoutSession.findAll({
    where: {
      user_id,
    },
  });

  return workoutSessions;
};

const workoutSessionsQuery = {
  type: new GraphQLList(workoutSessionType),
  // args: {
  //   user_id: { type: GraphQLInt },
  // },
  resolve: workoutSessionsQueryResolver,
};

export default workoutSessionsQuery;
