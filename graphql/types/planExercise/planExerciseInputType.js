import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from "graphql";

const planExerciseInputType = new GraphQLInputObjectType({
    name: "PlanExerciseInput",
    fields: {
        workoutDayId: { type: GraphQLInt },
        exerciseId: { type: GraphQLInt },
        sets: { type: GraphQLInt },
        repsTarget: { type: GraphQLInt },
        restSeconds: { type: GraphQLInt },
        orderInWorkout: { type: GraphQLInt },
    },
});

export default planExerciseInputType;