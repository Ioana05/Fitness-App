import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import trainer from "../../queries/trainer/index.js";
import clientTrainerRequestType from "../../types/clientTrainerRequest/clientTrainerRequestType.js";

const withdrawAssociationRequestResolver = async (_, {trainerId}, context) => {
    const userId = context.user_id;
    
    const request = await db.ClientTrainerRequest.findOne({
        where: {
            client_id: userId,
            trainer_id: trainerId,
            status: "PENDING",
        },
    });

    if (!request) {
        throw new Error("Request does not exist");
    }

    await request.destroy();

    return request;
}

const withdrawAssociationRequestMutation = {
    type: clientTrainerRequestType,
    args: {
        trainerId: { type: GraphQLInt },
    },
    resolve: withdrawAssociationRequestResolver,
};

export default withdrawAssociationRequestMutation;

