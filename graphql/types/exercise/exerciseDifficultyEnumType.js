import { GraphQLEnumType } from "graphql";

const exerciseDifficultyEnumType = new GraphQLEnumType({
    name: "exerciseDifficultyEnum",
    values: {
        1: { value: "1" },
        2: { value: "2" },
        3: { value: "3" },
        4: { value: "4" },
        5: { value: "5" }
    },
});

export default exerciseDifficultyEnumType;