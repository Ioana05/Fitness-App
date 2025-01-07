import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutDayType from "../workoutDay/workoutDayType";
import userType from "../userType";
import DateScalar from "../../scalars/dateScalar";

const workoutSessionType = new GraphQLObjectType({
    name: "WorkoutSession",
    fields: {
        id: { type: GraphQLInt },
        user: { 
            type: userType
        },
        workoutDay: { 
            type: workoutDayType
        },
        date: { type: DateScalar },
        duration_minutes: { type: GraphQLInt },
        notes: { type: GraphQLString }
    },
});

export default workoutSessionType;