import exerciseInputType from "../../types/exercise/exerciseInputType.js";
import exerciseType from "../../types/exercise/exerciseType.js";
import db from "../../../models/index.js";

const createExerciseMutationResolver = async (
    _,
    { exercise },
    context
    ) => {

    const isAthorized = !!context.user_id;

    if (!isAthorized) {
        throw new Error("You are not authenticated!");
    }

    const name = exercise.name;
    if (name && name.length < 3) {
        throw new Error("Exercise name must be at least 3 characters long");
    }

    const muscleGroup = exercise.muscleGroup;
    if (muscleGroup && muscleGroup.length < 3) {
        throw new Error("Muscle group must be at least 3 characters long");
    }

    const instructions = exercise.instructions;
    if (instructions && instructions.length < 3) {
        throw new Error("Instructions must be at least 3 characters long");
    }

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