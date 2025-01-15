import { GraphQLNonNull } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import planGoalInputType from "../../types/planGoal/planGoalInputType.js";
import db from "../../../models/index.js";

const createPlanGoalMutationResolver = async (_, { planGoal }, context) => {

  const userId = context.user_id;
  const workoutPlan = await db.WorkoutPlan.findByPk(planGoal.workoutPlanId);

  if (!workoutPlan) {
    throw new Error(`Workout plan with id ${planGoal.workoutPlanId} not found`);
  }

  if (workoutPlan.client_id !== userId) {
    throw new Error(`You are not authorized to create a plan goal for this workout plan`);
  }

  if (planGoal.name.length < 3) {
    throw new Error(`Plan goal name must be at least 3 characters long`);
  }

  if (planGoal.targetValue <= 0) {
    throw new Error(`Plan goal target value must be greater than 0`);
  }

  if (planGoal.initialValue <= 0) {
    throw new Error(`Plan goal initial value must be greater than 0`);
  }

  const startDate = new Date(workoutPlan.start_date);
  const endDate = new Date(workoutPlan.end_date);
  const deadline = new Date(planGoal.deadline);

  if (deadline < startDate || deadline > endDate) {
    throw new Error(`Plan goal deadline must be within the workout plan start and end dates`);
  }

  const planGoalData = {
    workout_plan_id: workoutPlan.id,
    name: planGoal.name,
    goal_type: planGoal.goalType,
    measurement_type: planGoal.measurementType,
    target_value: planGoal.targetValue,
    initial_value: planGoal.initialValue,
    deadline: planGoal.deadline,
    status: "INCOMPLETE"
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
