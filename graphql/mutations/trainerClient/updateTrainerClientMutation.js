import graphql from "graphql";
import trainerClientInputType from "../../types/trainerClient/trainerClientInputType.js";
import trainerClientType from "../../types/trainerClient/trainerClientType.js";
import db from "../../../models/index.js";

const updateTrainerClientMutationResolver = async (_, args) => {
  const id = args.id;

  const trainerClient = await db.TrainerClient.findOne({
    where: {
      id,
    },
  });

  //   if (!trainer) {
  //     return false;
  //   }

  const updatedTrainerClient = await trainerClient.update({
    ...args.trainerClient,
  });

  return updatedTrainerClient;
};

const updateTrainerClientMutation = {
  type: trainerClientType,
  args: {
    id: { type: graphql.GraphQLInt },
    trainerClient: { type: trainerClientInputType },
  },
  resolve: updateTrainerClientMutationResolver,
};

export default updateTrainerClientMutation;
