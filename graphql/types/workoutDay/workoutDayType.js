import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutPlanType from "../workoutPlanType";

const workoutDayType = new GraphQLObjectType({
    name: "WorkoutDay",
    fields: {
        id: { type: GraphQLInt },
        workoutPlan: { 
            type: workoutPlanType
        },
        dayNumber: { type: GraphQLInt },
        focusArea: { type: GraphQLString },
        instructions: { type: GraphQLString }
    },
});

export default workoutDayType;