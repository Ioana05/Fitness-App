import { GraphQLInt } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import db from "../../../models/index.js";

const planGoalQueryResolver = async (_, { id }) => {
    const planGoal = await db.PlanGoal.findOne({
        where: {
        id,
        },
    });
    
    if (!planGoal) {
        return null;
    }
    
    return planGoal;
}

const planGoalQuery = {
    type: planGoalType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: planGoalQueryResolver,
};

export default planGoalQuery;