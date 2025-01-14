import db from "../../../models/index.js";
import workoutPlanType from "../../types/workoutPlan/workoutPlanType.js";
import bcrypt from "bcrypt";
import workoutPlanInputType from "../../types/workoutPlan/workoutPlanInputType.js";

const createWorkoutPlanMutationResolver = async (
  _,
  { workoutPlan },
  context
) => {

  const userId = context.user_id;
  const trainer = await db.Trainer.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!trainer) {
    throw new Error("Only trainers can create workout plans");
  }

  const clientId = workoutPlan.client_id;
  const trainerClient = await db.TrainerClient.findOne({
    where: {
      client_id: clientId,
      trainer_id: trainer.id,
    },
  });

  if (!trainerClient) {
    throw new Error("You can only create workout plans for your clients");
  }

  const anotherWorkoutPlan = await db.WorkoutPlan.findOne({
    where: {
      trainer_id: trainer.id,
      client_id: clientId,
    },
  });

  if (anotherWorkoutPlan) {
    throw new Error("This client already has a workout plan");
  }

  const { name, startDate, endDate } = workoutPlan;

  if (name.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }

  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }

  const createdworkoutPlan = await db.WorkoutPlan.create({
    trainer_id: trainer.id,
    client_id: clientId,
    name: name,
    start_date: startDate,
    end_date: endDate,
  });

  return createdworkoutPlan;
};

const createWorkoutPlanMutation = {
  type: workoutPlanType,
  args: {
    workoutPlan: { type: workoutPlanInputType },
  },
  resolve: createWorkoutPlanMutationResolver,
};

export default createWorkoutPlanMutation;
