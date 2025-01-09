import { GraphQLEnumType } from "graphql";

const exerciseDifficultyEnumType = new GraphQLEnumType({
  name: "exerciseDifficultyEnum",
  values: {
    LEVEL_1: { value: "1" },
    LEVEL_2: { value: "2" },
    LEVEL_3: { value: "3" },
    LEVEL_4: { value: "4" },
    LEVEL_5: { value: "5" },
  },
});

export default exerciseDifficultyEnumType;
