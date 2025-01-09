import { GraphQLInt, GraphQLList } from "graphql";
import sessionExerciseType from "../../types/sessionExercise/sessionExerciseType.js";
import db from "../../../models/index.js";

const sessionExercisesQueryResolver = async (_, { id }) => {
  const sessionExercises = await db.SessionExercise.findAll();

  if (!sessionExercises) {
    return null;
  }

  return sessionExercises;
};

const sessionExercisesQuery = {
  type: new GraphQLList(sessionExerciseType),
  args: {
    id: { type: GraphQLInt },
  },
  resolve: sessionExercisesQueryResolver,
};

export default sessionExercisesQuery;
