import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLNonNull,
} from "graphql";
import requestStatusEnumType from "./requestStatusEnumType.js";
import DateScalar from "../../scalars/dateScalar.js";

const clientTrainerRequestType = new GraphQLObjectType({
  name: "ClientTrainerRequest",
  fields: {
    client_id: { type: GraphQLInt },
    trainer_id: { type: GraphQLInt },
    status: { type: requestStatusEnumType },
    request_date: { type: DateScalar },
    number_of_sessions: { type: GraphQLInt },
    start_date: { type: DateScalar },
  },
});

export default clientTrainerRequestType;
