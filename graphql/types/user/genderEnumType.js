import { GraphQLEnumType } from "graphql";

const genderEnumType = new GraphQLEnumType({
  name: "genderEnum",
  values: {
    MALE: { value: "MALE" },
    FEMALE: { value: "FEMALE" },
  },
});

export default genderEnumType;
