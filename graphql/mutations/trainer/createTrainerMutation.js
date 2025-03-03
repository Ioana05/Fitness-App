import trainerInputType from "../../types/trainer/trainerInputType.js";
import db from "../../../models/index.js";
import trainerType from "../../types/trainer/trainerType.js";
import bcrypt from "bcrypt";

const createTrainerMutationResolver = async (_, { trainer }, context) => {
  const createdTrainer = await db.Trainer.create({
    user_id: context.user_id,
    specialization: trainer.specialization,
    years_experience: trainer.years_experience,
    hourly_rate: trainer.hourly_rate,
    availability: trainer.availability,
  });

  return createdTrainer;
};

const createTrainerMutation = {
  type: trainerType,
  args: {
    trainer: { type: trainerInputType },
  },
  resolve: createTrainerMutationResolver,
};

export default createTrainerMutation;
