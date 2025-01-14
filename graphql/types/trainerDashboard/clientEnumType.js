import { GraphQLEnumType } from "graphql";

const clientEnumType = new GraphQLEnumType({
    name: "ClientEnum",
    values: {
        ACTIVE: { value: 0 },
        CANCELLED: { value: 1 },
    }
});
    
export default clientEnumType;