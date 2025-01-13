import graphql from "graphql";
import userInputType from "../../types/user/userInputType.js";
import userType from "../../types/user/userType.js";
import db from "../../../models/index.js";
import bcrypt from "bcrypt";

const updateUserMutationResolver = async (_, args, context) => {
  const id = args.id;
  console.log(context);

  const isSelf = context.user_id === args.id;
  if (!isSelf) {
    throw new Error("Permission denied");
  }

  const user = await db.User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return false;
  }

  const { password, ...otherFields } = args.user;

  const updatedUser = await user.update({
    ...otherFields,
  });

  if (password) {
    const hashedpassword = await bcrypt.hash(password, 5);
    await user.update({ password: hashedpassword });
  }

  return updatedUser;
};

const updateUserMutation = {
  type: userType,
  args: {
    id: { type: graphql.GraphQLInt },
    user: { type: userInputType },
  },
  resolve: updateUserMutationResolver,
};

export default updateUserMutation;
