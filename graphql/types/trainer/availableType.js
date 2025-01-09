import { GraphQLEnumType } from "graphql";

const availabilityEnumType = new GraphQLEnumType({
  name: "availabilityEnum",
  values: {
    AVAILABLE: { value: "AVAILABLE" },
    UNAVAILABLE: { value: "UNAVAILABLE" },
  },
});

export default availabilityEnumType;
