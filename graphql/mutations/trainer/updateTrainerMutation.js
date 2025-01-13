import graphql from "graphql";
import updateTrainerInputType from "../../types/trainer/updateTrainerInputType.js";
import trainerType from "../../types/trainer/trainerType.js";
import db from "../../../models/index.js";

const updateTrainerMutationResolver = async (_, args, context) => {
  const id = context.user_id;

  const trainer = await db.Trainer.findOne({
    where: {
      id,
    },
  });

    if (!trainer) {
      return null;
    }

  // filter out null values
  const trainerValues = Object.keys(args.trainer).reduce((acc, key) => {
    if (args.trainer[key] !== null) {
      acc[key] = args.trainer[key];
    }
    return acc;
  }, {});

  const updatedTrainer = await trainer.update({
    ...trainerValues,
  });

  return updatedTrainer;
};

const updateTrainerMutation = {
  type: trainerType,
  args: {
    trainer: { type: updateTrainerInputType },
  },
  resolve: updateTrainerMutationResolver,
};

export default updateTrainerMutation;
