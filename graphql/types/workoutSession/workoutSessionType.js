import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutDayType from "../workoutDay/workoutDayType.js";
import userType from "../user/userType.js";
import DateScalar from "../../scalars/dateScalar.js";

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
    },
    date: { type: DateScalar },
    duration_minutes: { type: GraphQLInt },
    notes: { type: GraphQLString },
  },
});

export default workoutSessionType;
