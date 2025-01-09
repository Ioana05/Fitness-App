import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import workoutDayType from "../../types/workoutDay/workoutDayType.js";

const workoutDayQueryResolver = async (parent, args, context) => {
    const workoutDay = await db.WorkoutDay.findOne({
        where: {
            id: args.id,
        },
    });


    if (!workoutDay) {
        return null;
    }

    return workoutDay;
}

const workoutDayQuery = {
    type: workoutDayType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: workoutDayQueryResolver,
};

export default workoutDayQuery;