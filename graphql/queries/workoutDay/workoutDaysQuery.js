import { GraphQLInt, GraphQLList } from "graphql";
import db from "../../../models/index.js";
import workoutDayType from "../../types/workoutDay/workoutDayType.js";

const workoutDaysQueryResolver = async () => {
    const workoutDays = await db.WorkoutDay.findAll();

    return workoutDays;
}

const workoutDaysQuery = {
    type: new GraphQLList(workoutDayType),
    resolve: workoutDaysQueryResolver,
};

export default workoutDaysQuery;