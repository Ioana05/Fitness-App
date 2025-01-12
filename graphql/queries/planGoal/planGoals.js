import { GraphQLInt, GraphQLList } from "graphql";
import planGoalType from "../../types/planGoal/planGoalType.js";
import db from "../../../models/index.js";

const planGoalsQueryResolver = async () => {
  const planGoals = await db.PlanGoal.findAll(); 

    return planGoals;
}

const planGoalsQuery = {
    type: new GraphQLList(planGoalType),
    resolve: planGoalsQueryResolver,
};

export default planGoalsQuery;