import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import clientTrainerRequestType from "../../types/clientTrainerRequest/clientTrainerRequestType.js";

const clientTrainerRequestQueryResolver = async (_, { id }) => {
    const request = await db.ClientTrainerRequest.findOne({
        where: {
        id,
        },
    });
    
    if (!request) {
        return null;
    }
    
    return request;
};

const clientTrainerRequestQuery = {
    type: clientTrainerRequestType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: clientTrainerRequestQueryResolver,
};

export default clientTrainerRequestQuery;
