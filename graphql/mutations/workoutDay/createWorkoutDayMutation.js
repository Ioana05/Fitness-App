import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import workoutDayInputType from "../../types/workoutDay/workoutDayInputType.js";
import db from "../../../models/index.js";

const createWorkoutDayMutationResolver = async (
    _,
    args,
    context
    ) => {
    const workoutDay = await db.WorkoutDay.create({
        workout_plan_id: args.workoutDay.workoutPlanId,
        day_number: args.workoutDay.dayNumber,
        focus_area: args.workoutDay.focusArea,
        instructions: args.workoutDay.instructions,
    });

    return workoutDay;
}

const createWorkoutDayMutation = {
    type: workoutDayType,
    args: {
        workoutDay: { type: workoutDayInputType },
    },
    resolve: createWorkoutDayMutationResolver,
};

export default createWorkoutDayMutation;