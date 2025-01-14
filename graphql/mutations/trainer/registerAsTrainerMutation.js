import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";
import registrationTrainerInputType from "../../types/trainer/registrationTrainerInput.js";
import trainerType from "../../types/trainer/trainerType.js";

const registerAsTrainerResolver = async (_, args, context) => {
    //   const isAuthorized = !!context.user_id;
    
    // if(!isAuthorized) {
    //     return false;
    // }
    
    const userId = context.user_id;
    let trainer = await db.Trainer.findOne({
        where: {
            user_id: userId,
        },
    });

    if (trainer) {
      return null;
    }

    const trainerInput = args.trainerInput;

    await db.Trainer.create({
      user_id: userId,
      specialization: trainerInput.specialization,
      years_experience: trainerInput.years_experience,
      hourly_rate: trainerInput.hourly_rate,
      availability: trainerInput.availability,
    });

    trainer = await db.Trainer.findOne({
      where: {
        user_id: userId,
      },
    });
    return trainer;
};

const registerAsTrainerMutation = {
    type: trainerType,
    args: {
        trainerInput: { type: registrationTrainerInputType },
    },
    resolve: registerAsTrainerResolver,
};

export default registerAsTrainerMutation;