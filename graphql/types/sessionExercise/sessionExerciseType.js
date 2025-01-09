import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } from "graphql";
import workoutSessionType from "../workoutSession/workoutSessionType.js";
import exerciseType from "../exercise/exerciseType.js";

const sessionExerciseType = new GraphQLObjectType({
    name: "SessionExercise",
    fields: {
        id: { type: GraphQLInt },
        workoutSession: {
            type: workoutSessionType,
            resolve: async (sessionExercise) => {
                // If the workout session is already loaded
                if (sessionExercise.WorkoutSession) {
                    return sessionExercise.WorkoutSession;
                }
                // If we need to load it
                return await sessionExercise.getWorkoutSession();
            }
        },
        exercise: {
            type: exerciseType,
            resolve: async (sessionExercise) => {
                // If the exercise is already loaded
                if (sessionExercise.Exercise) {
                    return sessionExercise.Exercise;
                }
                // If we need to load it
                return await sessionExercise.getExercise();
            }
        },
        setsCompleted: {
            type: GraphQLInt,
            resolve: (sessionExercise) => sessionExercise.sets_completed,
        },
        repsCompleted: {
            type: GraphQLInt,
            resolve: (sessionExercise) => sessionExercise.reps_completed,
        }, 
        weight: { type: GraphQLFloat },
        notes: { type: GraphQLString },
    }

});

export default sessionExerciseType;
