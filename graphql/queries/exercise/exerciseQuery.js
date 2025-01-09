import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import exerciseType from "../../types/exercise/exerciseType.js";

const exerciseQueryResolver = async (_, { id }) => {
  const exercise = await db.Exercise.findOne({
    where: {
      id,
    },
  });

  if (!exercise) {
    return null;
  }

  return exercise;
};

const exerciseQuery = {
  type: exerciseType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: exerciseQueryResolver,
};

export default exerciseQuery;
