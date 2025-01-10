import { GraphQLList } from "graphql";
import trainerClientType from "../../types/trainerClient/trainerClientType.js";
import db from "../../../models/index.js";

const trainersClientQueryResolver = async () => {
  const trainersClients = await db.TrainerClient.findAll();

  return trainersClients;
};

const trainersClientsQuery = {
  type: new GraphQLList(trainerClientType),
  resolve: trainersClientQueryResolver,
};

export default trainersClientsQuery;
