import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteTrainerResolver = async (_, args, context) => {
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    return false;
  }
  console.log(args);
  const isSelf = context.user_id === args.user.id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  const trainer = await db.Trainer.findOne({
    where: {
      id: args.id,
    },
  });

  if (!trainer) {
    return false;
  }

  await trainer.destroy();
  return true;
};

const deleteTrainerMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteTrainerResolver,
};

export default deleteTrainerMutation;
