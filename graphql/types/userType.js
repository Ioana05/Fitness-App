import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import genderEnumType from "./genderEnumType.js";

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: genderEnumType },
    email: { type: GraphQLString },
  },
});

export default userType;
