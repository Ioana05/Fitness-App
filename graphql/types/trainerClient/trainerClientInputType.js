import { GraphQLInt, GraphQLString, GraphQLInputObjectType } from "graphql";

const trainerClientInputType = new GraphQLInputObjectType({
  name: "TrainerClientInput",
  fields: {
    id: { type: GraphQLInt },
    client_id: { type: GraphQLInt },
    trainer_id: { type: GraphQLInt },
    start_date: { type: GraphQLString },
    session_remaining: { type: GraphQLInt },
  },
});

export default trainerClientInputType;
