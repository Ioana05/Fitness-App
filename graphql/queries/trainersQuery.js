import { GraphQLList } from "graphql";
import trainerType from "../types/trainerType.js";
import db from "../../models/index.js";

const trainersQueryResolver = async () => {
  const trainers = await db.Trainer.findAll();

  return trainers;
};

const trainersQuery = {
  type: new GraphQLList(trainerType),
  resolve: trainersQueryResolver,
};

export default trainersQuery;
