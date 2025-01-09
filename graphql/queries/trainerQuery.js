import { GraphQLInt } from "graphql";
import trainerType from "../types/trainerType.js";
import db from "../../models/index.js";

const trainerQueryResolver = async (_, { id }) => {
  const trainer = await db.Trainer.findOne({
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

  return trainer;
};

const trainerQuery = {
  type: trainerType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: trainerQueryResolver,
};

export default trainerQuery;
