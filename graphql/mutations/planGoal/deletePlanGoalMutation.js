import { GraphQLNonNull, GraphQLInt, GraphQLBoolean } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import db from "../../../models/index.js";

const deletePlanGoalMutationResolver = async (_, { id }, context) => {
  const userId = context.user_id;
  const goal = await db.PlanGoal.findByPk(id);

  if (!goal) {
    throw new Error(`Plan goal with id ${id} not found`);
  }

  const workoutPlan = await db.WorkoutPlan.findByPk(goal.workout_plan_id);

  if (!workoutPlan) {
    throw new Error(`Workout plan with id ${goal.workout_plan_id} not found`);
  }

  if (workoutPlan.client_id !== userId) {
    throw new Error(
      `You are not authorized to delete a plan goal for this workout plan`
    );
  }

  await goal.destroy();

  return goal;
};

const deletePlanGoalMutation = {
  type: planGoalType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: deletePlanGoalMutationResolver,
};

export default deletePlanGoalMutation;
