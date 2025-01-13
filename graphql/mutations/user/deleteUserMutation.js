import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteUserResolver = async (_, args, context) => {
  console.log(context);
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    return false;
  }

  const user = await db.User.findOne({
    where: {
      id: args.id,
    },
  });

  if (!user) {
    return false;
  }

  const isSelf = context.user_id === args.id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  await user.destroy();
  return true;
};

const deleteUserMutation = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: deleteUserResolver,
};

export default deleteUserMutation;
