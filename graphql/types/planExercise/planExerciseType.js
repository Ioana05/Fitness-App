import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutDayType from "../workoutDay/workoutDayType";
import exerciseType from "../exercise/exerciseType";

const planExerciseType = new GraphQLObjectType({
    name: "PlanExercise",
    fields: {
        id: { type: GraphQLInt },
        workout_day: {
            type: workoutDayType
        },
        exercise: {
            type: exerciseType
        },
        sets: { type: GraphQLInt },
        reps_target: { type: GraphQLInt },
        rest_seconds: { type: GraphQLInt },
        order_in_workout: { type: GraphQLInt }
    },
});

export default planExerciseType;