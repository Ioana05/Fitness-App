import updateTrainerMutation from "./updateTrainerMutation.js";
import unregisterAsTrainerMutation from "./unregisterAsTrainerMutation.js";
import registerAsTrainerMutation from "./registerAsTrainerMutation.js";

export default {
  registerAsTrainer: registerAsTrainerMutation,
  updateTrainer: updateTrainerMutation,
  unregisterAsTrainer: unregisterAsTrainerMutation,
};
