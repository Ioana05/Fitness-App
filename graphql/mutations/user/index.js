import createUserMutation from "./createUserMutation.js";
import updateUserMutation from "./updateUserMutation.js";
import deleteUserMutation from "./deleteUserMutation.js";

export default {
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
}