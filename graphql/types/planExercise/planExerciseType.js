import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutDayType from "../workoutDay/workoutDayType.js";
import exerciseType from "../exercise/exerciseType.js";

const planExerciseType = new GraphQLObjectType({
    name: "PlanExercise",
    fields: {
        id: { type: GraphQLInt },
        exercise: {
            type: exerciseType,
            resolve: async (parent, args, context) => {
                return await parent.getExercise();
            }
        },
        sets: { type: GraphQLInt },
        reps_target: { type: GraphQLInt },
        rest_seconds: { type: GraphQLInt },
        order_in_workout: { type: GraphQLInt }
    },
});

export default planExerciseType;