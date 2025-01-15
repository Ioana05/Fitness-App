import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from "graphql";

const planExerciseInputType = new GraphQLInputObjectType({
    name: "PlanExerciseInput",
    fields: {
        exerciseId: { type: new GraphQLNonNull(GraphQLInt) },
        sets: { type: new GraphQLNonNull(GraphQLInt) },
        repsTarget: { type: new GraphQLNonNull(GraphQLInt) },
        restSeconds: { type: new GraphQLNonNull(GraphQLInt) },
        orderInWorkout: { type: new GraphQLNonNull(GraphQLInt) },
    },
});

export default planExerciseInputType;