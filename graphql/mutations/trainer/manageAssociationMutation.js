import db from "../../../models/index.js";
import clientTrainerRequestType from "../../types/clientTrainerRequest/clientTrainerRequestType.js";
import manageClientTrainerRequestInputType from "../../types/clientTrainerRequest/manageClientTrainerRequestInputType.js";
import { startOfDay } from "date-fns";

const manageAssociationResolver = async (_, args, context) => {
    const userId = context.user_id;
    const { requestId, status } = args.request;

    const request = await db.ClientTrainerRequest.findOne({
        where: {
            id: requestId,
        },
    });

    if (!request) {
        throw new Error("Request not found");
    }

    if (request.trainer_id !== userId) {
        throw new Error("You are not authorized to perform this action");
    }

    if (request.status !== "PENDING") {
        throw new Error("Request is not pending");
    }

    if (status === "ACCEPT") {
        request.status = "ACCEPTED";

        await db.TrainerClient.create({
            client_id: request.client_id,
            trainer_id: request.trainer_id,
            sessions_remaining: request.number_of_sessions,
            start_date: new Date(request.start_date).toISOString(),
        });
    } else if (status === "REJECT") {
      request.status = "REJECTED";
    } else {
      throw new Error("Invalid action");
    }

    await request.save();

    return request;
}

const manageAssociationMutation = {
  type: clientTrainerRequestType,
  args: {
    request: { type: manageClientTrainerRequestInputType },
  },
  resolve: manageAssociationResolver,
};

export default manageAssociationMutation;