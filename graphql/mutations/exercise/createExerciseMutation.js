import exerciseInputType from "../../types/exercise/exerciseInputType.js";
import exerciseType from "../../types/exercise/exerciseType.js";
import db from "../../../models/index.js";

const createExerciseMutationResolver = async (
    _,
    { exercise },
    context
    ) => {
    const createdExercise = await db.Exercise.create({
        name: exercise.name,
        muscle_group: exercise.muscleGroup,
        difficulty_level: exercise.difficultyLevel,
        instructions: exercise.instructions,
    });
    
    return createdExercise;
};

const createExerciseMutation = {
    type: exerciseType,
    args: {
        exercise: { type: exerciseInputType },
    },
    resolve: createExerciseMutationResolver,
};

export default createExerciseMutation;