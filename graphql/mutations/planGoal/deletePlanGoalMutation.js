import { GraphQLNonNull, GraphQLInt, GraphQLBoolean } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import db from "../../../models/index.js";

const deletePlanGoalMutationResolver = async (_, { id }, context) => {
    const existingGoal = await db.PlanGoal.findByPk(id);
    if (!existingGoal) {
      throw new Error(`Plan goal with id ${id} not found`);
    }

    await existingGoal.destroy();

    return existingGoal;
};

const deletePlanGoalMutation = {
  type:planGoalType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: deletePlanGoalMutationResolver,
};

export default deletePlanGoalMutation;
