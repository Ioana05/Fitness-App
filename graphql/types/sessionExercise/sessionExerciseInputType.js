import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from "graphql";

const sessionExerciseInputType = new GraphQLInputObjectType({
    name: "SessionExerciseInput",
    fields: {
        workoutSessionId: { type: GraphQLInt },
        exerciseId: { type: GraphQLInt },
        setsCompleted: { type: GraphQLInt },
        repsCompleted: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        notes: { type: GraphQLString },
    },
});

export default sessionExerciseInputType;