import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import workoutPlanType from "../workoutPlan/workoutPlanType.js";

const workoutDayInputType = new GraphQLInputObjectType({
    name: "WorkoutDayInput",
    fields: {
        workoutPlanId: { type: GraphQLInt },
        dayNumber: { type: GraphQLInt },
        focusArea: { type: GraphQLString },
        instructions: { type: GraphQLString },
    },
});

export default workoutDayInputType;
