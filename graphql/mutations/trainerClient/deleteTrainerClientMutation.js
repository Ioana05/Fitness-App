import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteTrainerClientResolver = async (_, args, context) => {
  //   const isAuthorized = !!context.user_id;

  // if(!isAuthorized) {
  //     return false;
  // }

  const trainerClient = await db.TrainerClient.findOne({
    where: {
      id: args.id,
    },
  });

  if (!trainerClient) {
    return false;
  }

  await trainerClient.destroy();
  return true;
};

const deleteTrainerClientMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteTrainerClientResolver,
};

export default deleteTrainerClientMutation;
