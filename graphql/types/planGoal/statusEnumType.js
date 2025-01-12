import {
  GraphQLEnumType,
} from "graphql";


const statusType = new GraphQLEnumType({
  name: "statusType",
  values: {
    COMPLETE: { value: "COMPLETE" },
    INCOMPLETE: { value: "INCOMPLETE" },
  },
});

export default statusType;