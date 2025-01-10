import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
  } from "graphql";
  import userType from "../user/userType.js";
  import trainerType from "../trainer/trainerType.js";
  
  const trainerClientType = new GraphQLObjectType({
    name: "TrainerClient",
    fields: {
      id: { type: GraphQLInt },
      client: {
        type: userType,
        resolve: async (trainerClient) => {
          const client = await trainerClient.getUser();
  
          return client;
        },
      },
      trainer: {
        type: trainerType,
        resolve: async (trainerClient) => {
          const trainer = await trainerClient.getUser();
  
          return trainer;
        },
      },
      start_date: {type: GraphQLString},
      session_remaining: {type: GraphQLInt}
    },
  });
  
  export default trainerClientType;
  