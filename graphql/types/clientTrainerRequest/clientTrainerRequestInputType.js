import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from "graphql";
import DateScalar from "../../scalars/dateScalar.js";

const clientTrainerRequestInputType = new GraphQLInputObjectType({
    name: "ClientTrainerRequestInput",
    fields: {
        trainerId: { type: new GraphQLNonNull(GraphQLInt) },
        numberOfSessions: { type: new GraphQLNonNull(GraphQLInt) },
        startDate: { type: new GraphQLNonNull(DateScalar) },
    },
});

export default clientTrainerRequestInputType;
