import userInputType from "../../types/userInputType.js";
import db from "../../../models/index.js";
import userType from "../../types/userType.js";
import bcrypt from "bcrypt";

const createUserMutationResolver = async (_, { user }, context) => {
  const password = await bcrypt.hash(user.password, 5);

  const createdUser = await db.User.create({
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    gender: user.gender,
    email: user.email,
    password: password,
  });

  return createdUser;
};

const createUserMutation = {
  type: userType,
  args: {
    user: { type: userInputType },
  },
  resolve: createUserMutationResolver,
};

export default createUserMutation;
