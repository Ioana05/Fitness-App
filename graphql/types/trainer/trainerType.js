import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
} from "graphql";
import availableType from "./availableType.js";
import userType from "../user/userType.js";

const trainerType = new GraphQLObjectType({
  name: "Trainer",
  fields: {
    id: { type: GraphQLInt },
    user: {
      type: userType,
      resolve: async (trainer) => {
        const user = await trainer.getUser();

        return user;
      },
    },
    specialization: { type: GraphQLString },
    years_experience: { type: GraphQLInt },
    hourly_rate: { type: GraphQLFloat },
    availability: { type: availableType },
  },
});

export default trainerType;
