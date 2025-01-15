import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import workoutDayType from "../workoutDay/workoutDayType.js";
import userType from "../user/userType.js";
import DateScalar from "../../scalars/dateScalar.js";
import sessionExerciseType from "../sessionExercise/sessionExerciseType.js";

const workoutSessionType = new GraphQLObjectType({
  name: "WorkoutSession",
  fields: {
    id: { type: GraphQLInt },
    user: {
      type: userType,
      resolve: async (workoutSession) => {
        const user = await workoutSession.getUser();

        return user;
      },
    },
    workoutDay: {
      type: workoutDayType,
      resolve: async (workoutSession) => {
        const workoutDay = await workoutSession.getWorkoutDay();

        return workoutDay;
      },
    },
    date: { type: DateScalar },
    duration_minutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
    sessionExercises: {
      type: new GraphQLList(sessionExerciseType),
      resolve: async (workoutSession) => {
        const sessionExercises = await workoutSession.getSessionExercises();

        return sessionExercises;
      },
    }
  },
});

export default workoutSessionType;
