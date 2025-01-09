import { GraphQLInt } from "graphql";
import workoutSessionType from "../types/workoutSessionType.js";
import db from "../../models/index.js";

const workoutSessionQueryResolver = async (_, { id }) => {
  const workoutSession = await db.WorkoutSession.findOne({
    where: {
      id,
    },
  });

  if (!workoutSession) {
    return null;
  }

  return workoutSession;
};

const workoutSessionQuery = {
  type: workoutSessionType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: workoutSessionQueryResolver,
};

export default workoutSessionQuery;
