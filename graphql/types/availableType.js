import { GraphQLEnumType } from "graphql";

const availableType = new GraphQLEnumType({
  name: "availableEnum",
  values: {
    AVAILABLE: { value: "AVAILABLE" },
    UNAVAILABLE: { value: "UNAVAILABLE" },
  },
});

export default availableType;
