import graphql from "graphql";
import trainerInputType from "../../types/trainer/trainerInputType.js";
import trainerType from "../../types/trainer/trainerType.js";
import db from "../../../models/index.js";

const updateTrainerMutationResolver = async (_, args, context) => {
  const id = args.id;

  const trainer = await db.Trainer.findOne({
    where: {
      id,
    },
  });

  if (!trainer) {
    return false;
  }

  const isSelf = context.user_id === trainer.user_id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  const updatedTrainer = await trainer.update({
    ...args.trainer,
  });

  return updatedTrainer;
};

const updateTrainerMutation = {
  type: trainerType,
  args: {
    id: { type: graphql.GraphQLInt },
    trainer: { type: trainerInputType },
  },
  resolve: updateTrainerMutationResolver,
};

export default updateTrainerMutation;
