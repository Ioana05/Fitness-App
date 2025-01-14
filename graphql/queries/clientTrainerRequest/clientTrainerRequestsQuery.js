import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import clientTrainerRequestType from "../../types/clientTrainerRequest/clientTrainerRequestType.js";

const clientTrainerRequestsQueryResolver = async () => {
    const requests = await db.ClientTrainerRequest.findAll();
    
    return requests;
}

const clientTrainerRequestsQuery = {
    type: new GraphQLList(clientTrainerRequestType),
    resolve: clientTrainerRequestsQueryResolver,
};

export default clientTrainerRequestsQuery;