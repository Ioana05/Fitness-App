import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import trainerType from "../../types/trainer/trainerType.js";

const unregisterAsTrainerResolver = async (_, args, context) => {
  //   const isAuthorized = !!context.user_id;

  // if(!isAuthorized) {
  //     return false;
  // }

  const userId = context.user_id;
  const trainer = await db.Trainer.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!trainer) {
    return null;
  }

  await trainer.destroy();
  return trainer;
};

const unregisterAsTrainerMutation = {
  type: trainerType,
  resolve: unregisterAsTrainerResolver,
};

export default unregisterAsTrainerMutation;
