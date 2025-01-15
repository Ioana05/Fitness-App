import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from "graphql";

const planExerciseUpdateInputType = new GraphQLInputObjectType({
    name: "PlanExerciseUpdateInput",
    fields: {
        exerciseId: { type: GraphQLInt },
        sets: { type: GraphQLInt },
        repsTarget: { type: GraphQLInt },
        restSeconds: { type: GraphQLInt },
        orderInWorkout: { type: GraphQLInt },
    },
});

export default planExerciseUpdateInputType;