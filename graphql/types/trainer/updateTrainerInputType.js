import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from "graphql";
import availableType from "./availableType.js";

const updateTrainerInputType = new GraphQLInputObjectType({
  name: "UpdateTrainerInput",
  fields: {
    specialization: { type: GraphQLString },
    years_experience: { type: GraphQLInt },
    hourly_rate: { type: GraphQLFloat },
    availability: { type: availableType },
  },
});

export default updateTrainerInputType;
