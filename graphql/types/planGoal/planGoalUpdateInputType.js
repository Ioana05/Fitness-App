import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
} from "graphql";
import goalTypeEnum from "./goalEnumType.js";
import statusType from "./statusEnumType.js";
import dateScalar from "../../scalars/dateScalar.js";

const planGoalUpdateInputType = new GraphQLInputObjectType({
    name: "PlanGoalUpdateInput",
    fields: {
        name: { type: GraphQLString },
        goalType: { type: goalTypeEnum },
        measurementType: { type: GraphQLString },
        targetValue: { type: GraphQLFloat },
        initialValue: { type: GraphQLFloat },
        deadline: { type: dateScalar },
        status: { type: statusType },
    },
});

export default planGoalUpdateInputType;
