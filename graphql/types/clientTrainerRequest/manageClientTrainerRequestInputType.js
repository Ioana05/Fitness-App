import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

const manageClientTrainerRequestInputType = new GraphQLInputObjectType({
  name: "ManageClientTrainerRequestInput",
  fields: {
    requestId: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(new GraphQLEnumType({
        name: "RequestStatusEnumInput",
        values: {
            ACCEPT: { value: "ACCEPT" },
            REJECT: { value: "REJECT" },
        },
    })) },
  },
});

export default manageClientTrainerRequestInputType;
