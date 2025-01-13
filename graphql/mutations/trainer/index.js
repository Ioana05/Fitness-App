import updateTrainerMutation from "./updateTrainerMutation.js";
import unregisterAsTrainerMutation from "./unregisterAsTrainerMutation.js";
import registerAsTrainerMutation from "./registerAsTrainerMutation.js";
import manageAssociationMutation from "./manageAssociationMutation.js";

export default {
  registerAsTrainer: registerAsTrainerMutation,
  updateTrainer: updateTrainerMutation,
  unregisterAsTrainer: unregisterAsTrainerMutation,
  manageAssociation: manageAssociationMutation,
};
