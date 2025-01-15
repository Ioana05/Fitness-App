import userInputType from "../../types/user/userInputType.js";
import db from "../../../models/index.js";
import userType from "../../types/user/userType.js";
import bcrypt from "bcrypt";

const createUserMutationResolver = async (_, { user }, context) => {
  const existingUser = await db.User.findOne({ where: { email: user.email } });

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

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
