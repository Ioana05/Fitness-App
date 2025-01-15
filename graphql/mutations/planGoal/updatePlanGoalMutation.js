import { GraphQLNonNull, GraphQLInt } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import planGoalUpdateInputType from "../../types/planGoal/planGoalUpdateInputType.js";
import db from "../../../models/index.js";

const updatePlanGoalMutationResolver = async (_, { id, planGoal }, context) => {
  const existingGoal = await db.PlanGoal.findByPk(id);
  if (!existingGoal) {
    throw new Error(`Plan goal with id ${id} not found`);
  }

  const userId = context.user_id;
  const workoutPlan = await db.WorkoutPlan.findByPk(
    existingGoal.workout_plan_id
  );

  if (!workoutPlan) {
    throw new Error(
      `Workout plan with id ${existingGoal.workout_plan_id} not found`
    );
  }

  if (workoutPlan.client_id !== userId) {
    throw new Error(
      `You are not authorized to update a plan goal for this workout plan`
    );
  }

  if (planGoal.name && planGoal.name.length < 3) {
    throw new Error(`Plan goal name must be at least 3 characters long`);
  }

  if (planGoal.targetValue && planGoal.initialValue) {
    if (planGoal.targetValue <= 0) {
      throw new Error(`Plan goal target value must be greater than 0`);
    }

    if (planGoal.initialValue <= 0) {
      throw new Error(`Plan goal initial value must be greater than 0`);
    }

    if (planGoal.targetValue < planGoal.initialValue) {
      throw new Error(
        `Plan goal target value must be greater than or equal to the initial value`
      );
    }
  } else if (planGoal.targetValue && !planGoal.initialValue) {
    if (planGoal.targetValue <= 0) {
      throw new Error(`Plan goal target value must be greater than 0`);
    }

    if (planGoal.targetValue < existingGoal.initial_value) {
      throw new Error(
        `Plan goal target value must be greater than or equal to the initial value`
      );
    }
  } else if (!planGoal.targetValue && planGoal.initialValue) {
    if (planGoal.initialValue <= 0) {
      throw new Error(`Plan goal initial value must be greater than 0`);
    }

    if (existingGoal.target_value < planGoal.initialValue) {
      throw new Error(
        `Plan goal target value must be greater than or equal to the initial value`
      );
    }
  }

  // Filter out null values first
  const nonNullValues = Object.entries(planGoal).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});

  // Convert keys to snake_case
  const planGoalData = Object.entries(nonNullValues).reduce(
    (acc, [key, value]) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      acc[snakeKey] = value;
      return acc;
    },
    {}
  );

  console.log(planGoalData);

  await existingGoal.update(planGoalData);

  return existingGoal;
};

const updatePlanGoalMutation = {
  type: planGoalType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    planGoal: { type: new GraphQLNonNull(planGoalUpdateInputType) },
  },
  resolve: updatePlanGoalMutationResolver,
};

export default updatePlanGoalMutation;
