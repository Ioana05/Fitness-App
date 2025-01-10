import trainerClientInputType from "../../types/trainerClient/trainerClientInputType.js";
import trainerClientType from "../../types/trainerClient/trainerClientType.js";
import db from "../../../models/index.js";

const createTrainerClientMutationResolver = async (
  _,
  { trainerClient },
  context
) => {
  const createdTrainerClient = await db.TrainerClient.create({
    client_id: trainerClient.client_id,
    trainer_id: trainerClient.trainer_id,
    start_date: trainerClient.start_date,
    session_remaining: trainerClient.session_remaining,
  });

  return createdTrainerClient;
};

const createTrainerClientMutation = {
  type: trainerClientType,
  args: {
    trainerClient: { type: trainerClientInputType },
  },
  resolve: createTrainerClientMutationResolver,
};

export default createTrainerClientMutation;
