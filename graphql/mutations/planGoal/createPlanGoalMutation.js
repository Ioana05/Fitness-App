import { GraphQLNonNull } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import planGoalInputType from "../../types/planGoal/planGoalInputType.js";
import db from "../../../models/index.js";

const createPlanGoalMutationResolver = async (_, { planGoal }, context) => {
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

  try {
    const newPlanGoal = await db.PlanGoal.create(planGoalData);
    return newPlanGoal;
  } catch (error) {
    throw new Error(`Failed to create plan goal: ${error.message}`);
  }
};

const createPlanGoalMutation = {
  type: planGoalType,
  args: {
    planGoal: { type: new GraphQLNonNull(planGoalInputType) },
  },
  resolve: createPlanGoalMutationResolver,
};

export default createPlanGoalMutation;
