import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import genderEnumType from "./genderEnumType.js";

const userInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: genderEnumType },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export default userInputType;
