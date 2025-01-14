import { GraphQLEnumType } from "graphql";

const requestStatusEnumType = new GraphQLEnumType({
    name: "RequestStatusEnum",
    values: {
        PENDING: { value: "PENDING" },
        ACCEPTED: { value: "ACCEPTED" },
        REJECTED: { value: "REJECTED" },
    },
});

export default requestStatusEnumType;
