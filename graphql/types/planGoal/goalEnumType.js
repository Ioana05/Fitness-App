import {
  GraphQLEnumType,
} from "graphql";


const goalType = new GraphQLEnumType({
    name: "goalType",
    values: {
        WEIGHT: { value: "WEIGHT" },
        MEASUREMENT: { value: "MEASUREMENT" },
    },
});

export default goalType;