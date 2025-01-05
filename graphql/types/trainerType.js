import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
} from "graphql";
import availableType from "./availableType.js";

const trainerType = new GraphQLObjectType({
  name: "Trainer",
  fields: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    specialization: { type: GraphQLString },
    years_experience: { type: GraphQLInt },
    hourly_rate: { type: GraphQLFloat },
    availability: { type: availableType },
  },
});

export default trainerType;
