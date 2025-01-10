import { GraphQLInt } from "graphql";
import trainerClientType from "../../types/trainerClient/trainerClientType.js";
import db from "../../../models/index.js";

const trainerClientQueryResolver = async (_, { id }) => {
  const trainerClient = await db.TrainerClient.findOne({
    where: {
      id,
    },
  });
  console.log(db.Trainer);
  // const trainer = await db.Trainer.findByPk(id);
  // // where: {
  // //   id,
  // // },
  // // if (!user) {
  // //   return null;
  // // }

  return trainerClient;
};

const trainerClientQuery = {
  type: trainerClientType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: trainerClientQueryResolver,
};

export default trainerClientQuery;
