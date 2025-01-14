import workoutDayType from "../../types/workoutDay/workoutDayType.js";
import db from "../../../models/index.js";
import { GraphQLInt } from "graphql";

const deleteWorkoutDayMutationResolver = async (
    _,
    { id },
    context
    ) => {
    const workoutDay = await db.WorkoutDay.findOne({
        where: {
            id,
        },
    });

    if (!workoutDay) {
        return null;
    }

    await workoutDay.destroy();

    return workoutDay;
}

const deleteWorkoutDayMutation = {
    type: workoutDayType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteWorkoutDayMutationResolver,
};

export default deleteWorkoutDayMutation;
