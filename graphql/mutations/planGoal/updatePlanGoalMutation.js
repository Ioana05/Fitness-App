import { GraphQLNonNull, GraphQLInt } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import planGoalInputType from "../../types/planGoal/planGoalInputType.js";
import db from "../../../models/index.js";

const updatePlanGoalMutationResolver = async (_, { id, planGoal }, context) => {
    const existingGoal = await db.PlanGoal.findByPk(id);
    if (!existingGoal) {
      throw new Error(`Plan goal with id ${id} not found`);
    }

    const planGoalData = {
      workout_plan_id: planGoal.workoutPlanId,
      name: planGoal.name,
      goal_type: planGoal.goalType,
      measurement_type: planGoal.measurementType,
      target_value: planGoal.targetValue,
      initial_value: planGoal.initialValue,
      deadline: planGoal.deadline,
      status: planGoal.status,
    };

    await existingGoal.update(planGoalData);

    return existingGoal;
};

const updatePlanGoalMutation = {
  type: planGoalType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    planGoal: { type: new GraphQLNonNull(planGoalInputType) },
  },
  resolve: updatePlanGoalMutationResolver,
};

export default updatePlanGoalMutation;
