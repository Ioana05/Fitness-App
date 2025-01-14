import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import clientTrainerRequestType from "../../types/clientTrainerRequest/clientTrainerRequestType.js";
import clientTrainerRequestInputType from "../../types/clientTrainerRequest/clientTrainerRequestInputType.js";

const requestAssociationWithTrainerResolver = async (_, args, context) => {
  const userId = context.user_id;
  const { trainerId, numberOfSessions, startDate } = args.request;

  // Check if user exists
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if trainer exists
  const trainer = await db.Trainer.findOne({
    where: {
      id: trainerId,
    },
  });
  if (!trainer) {
    throw new Error("Trainer not found");
  }

  if (userId === trainerId) {
    throw new Error("You cannot request association with yourself");
  }

  const requestAlreadyExists = await db.ClientTrainerRequest.findOne({
    where: {
      client_id: userId,
      trainer_id: trainerId,
      status: "PENDING",
    },
  });

  if (requestAlreadyExists) {
    throw new Error("You have already requested association with this trainer");
  }

  const isAssociated = await db.TrainerClient.findOne({
    where: {
      client_id: userId,
    },
  });

  if (isAssociated) {
    throw new Error("You are already associated with a trainer");
  }

  if (new Date(startDate) < new Date()) {
    throw new Error("Start date must be in the future");
  }

  if (numberOfSessions <= 0) {
    throw new Error("Number of sessions must be greater than 0");
  }

  try {
    const request = await db.ClientTrainerRequest.create({
      client_id: userId,
      trainer_id: trainerId,
      status: "PENDING",
      request_date: new Date().toISOString(),
      number_of_sessions: numberOfSessions,
      start_date: startDate,
    });

    return request;
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create trainer request");
  }
};

const requestAssociationWithTrainerMutation = {
  type: clientTrainerRequestType,
  args: {
    request: { type: clientTrainerRequestInputType },
  },
  resolve: requestAssociationWithTrainerResolver,
};

export default requestAssociationWithTrainerMutation;
