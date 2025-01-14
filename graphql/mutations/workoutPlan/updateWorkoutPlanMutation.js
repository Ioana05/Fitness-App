import graphql from "graphql";
import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import workoutPlanUpdateInputType from "../../types/workoutPlan/workoutPlanUpdateInputType.js";

const updateWorkoutPlanMutationResolver = async (_, args, context) => {
  const id = args.id;

  const workoutPlan = await db.WorkoutPlan.findOne({
    where: {
      id,
    },
  });

  if (!workoutPlan) {
    throw new Error("Workout plan not found");
  }

  const userId = context.user_id;
  const trainer = await db.Trainer.findOne({
    where: {
      user_id: userId,
    },
  });

  if ((trainer && trainer.id !== workoutPlan.trainer_id) && (workoutPlan.client_id !== userId)) {
    throw new Error("You are not authorized to perform this action");
  }

  const name = args.workoutPlan.name;
  const startDate = args.workoutPlan.start_date;
  const endDate = args.workoutPlan.end_date;

  if (name && name.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }

  if (startDate && endDate && startDate > endDate) {
    throw new Error("Start date must be before end date");
  } else if (startDate && !endDate) {
    if (startDate > workoutPlan.end_date) {
      throw new Error("Start date must be before end date");
    }
  } else if (!startDate && endDate) {
    if (workoutPlan.start_date > endDate) {
      throw new Error("Start date must be before end date");
    }
  }

  if (name) {
    workoutPlan.name = name;
  }

  if (startDate) {
    workoutPlan.start_date = startDate;
  }

  if (endDate) {
    workoutPlan.end_date = endDate;
  }

  await workoutPlan.save();

  return workoutPlan;
};

const updateWorkoutPlanMutation = {
  type: workoutPlanType,
  args: {
    id: { type: graphql.GraphQLInt },
    workoutPlan: { type: workoutPlanUpdateInputType },
  },
  resolve: updateWorkoutPlanMutationResolver,
};

export default updateWorkoutPlanMutation;
