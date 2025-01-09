import { GraphQLInt, GraphQLList} from "graphql";
import planExerciseType from "../../types/planExercise/planExerciseType.js";
import db from "../../../models/index.js";

const planExercisesQueryResolver = async (_, { id }) => {
  const planExercises = await db.PlanExercise.findAll();

  if (!planExercises) {
    return null;
  }

  return planExercises;
};

const planExerciseQuery = {
  type: new GraphQLList(planExerciseType),
  args: {
    id: { type: GraphQLInt },
  },
  resolve: planExercisesQueryResolver,
};

export default planExerciseQuery;
