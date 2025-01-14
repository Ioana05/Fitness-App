import {
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull,
} from "graphql";
import availableType from "./availableType.js";

const registrationTrainerInputType = new GraphQLInputObjectType({
    name: "RegistrationTrainerInput",
    fields: {
        specialization: { type: new GraphQLNonNull(GraphQLString) },
        years_experience: { type: new GraphQLNonNull(GraphQLInt) },
        hourly_rate: { type: new GraphQLNonNull(GraphQLFloat) },
        availability: { type: new GraphQLNonNull(availableType) },
    },
});

export default registrationTrainerInputType;
