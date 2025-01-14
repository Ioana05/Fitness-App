import createUserMutation from "./createUserMutation.js";
import updateUserMutation from "./updateUserMutation.js";
import deleteUserMutation from "./deleteUserMutation.js";
import requestAssociationWithTrainerMutation from "./requestAssociationWithTrainerMutation.js";
import withdrawAssociationRequestMutation from "./withdrawAssociationRequestMutation.js";

export default {
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
    requestAssociationWithTrainer: requestAssociationWithTrainerMutation,
    withdrawAssociationRequest: withdrawAssociationRequestMutation,
}