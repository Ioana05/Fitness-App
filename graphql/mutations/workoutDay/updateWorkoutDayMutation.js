import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import workoutDayInputType from "../../types/workoutDay/workoutDayInputType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const updateWorkoutDayMutationResolver = async (
    _,
    args,
    context
    ) => {
    const id = args.id;
    const workoutDay = await db.WorkoutDay.findOne({
        where: {
            id,
        },
    });

    const updatedWorkoutDay = await workoutDay.update({
        workout_plan_id: args.workoutDay.workoutPlanId,
        day_number: args.workoutDay.dayNumber,
        focus_area: args.workoutDay.focusArea,
        instructions: args.workoutDay.instructions,
    });

    return updatedWorkoutDay;
}

const updateWorkoutDayMutation = {
    type: workoutDayType,
    args: {
        id: { type: GraphQLInt },
        workoutDay: { type: workoutDayInputType },
    },
    resolve: updateWorkoutDayMutationResolver,
};

export default updateWorkoutDayMutation;