import db from "../../models/index.js";
import { Op } from "sequelize";
import _ from "lodash";

class SessionAnalysisService {
  async getSessionAnalysis(userId, timeRange = 90) {
    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - timeRange * 24 * 60 * 60 * 1000
    );

    const sessions = await db.WorkoutSession.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: db.SessionExercise,
          include: [
            {
              model: db.Exercise,
            },
          ],
        },
        {
          model: db.WorkoutDay,
          include: [
            {
              model: db.PlanExercise,
              include: [
                {
                  model: db.Exercise,
                },
              ],
            },
          ],
        },
      ],
      order: [["date", "ASC"]],
    });

    const muscleGroups = await this.analyzeMuscleGroups(sessions);
    const exerciseAnalysis = await this.analyzeExercises(sessions);

    return {
      trainingPattern: this.analyzeTrainingPattern(sessions),
      muscleGroups,
      exercises: exerciseAnalysis,
    };
  }

  async analyzeMuscleGroups(sessions) {
    const muscleGroupStats = {};

    sessions.forEach((session) => {
      session.SessionExercises.forEach((sessionExercise) => {
        const muscleGroups = sessionExercise.Exercise.muscle_group
          .split(",")
          .map((mg) => mg.trim())
          .filter((mg) => mg && mg !== "Cardio");

        muscleGroups.forEach((muscleGroup) => {
          if (!muscleGroupStats[muscleGroup]) {
            muscleGroupStats[muscleGroup] = {
              totalVolume: 0,
              frequency: 0,
              exerciseVariety: new Set(),
              intensityValues: [],
              averageVolumePerSession: 0,
              lastTrainedDate: null,
              exercises: new Set(),
            };
          }

          const volumePerMuscle =
            (sessionExercise.weight *
              sessionExercise.sets_completed *
              sessionExercise.reps_completed) /
            muscleGroups.length;

          muscleGroupStats[muscleGroup].totalVolume += volumePerMuscle;
          muscleGroupStats[muscleGroup].frequency += 1;
          muscleGroupStats[muscleGroup].exerciseVariety.add(
            sessionExercise.Exercise.id
          );
          muscleGroupStats[muscleGroup].intensityValues.push(
            parseInt(sessionExercise.Exercise.difficulty_level)
          );
          muscleGroupStats[muscleGroup].exercises.add(
            sessionExercise.Exercise.name
          );

          const sessionDate = new Date(session.date);
          if (
            !muscleGroupStats[muscleGroup].lastTrainedDate ||
            sessionDate >
              new Date(muscleGroupStats[muscleGroup].lastTrainedDate)
          ) {
            muscleGroupStats[muscleGroup].lastTrainedDate = session.date;
          }
        });
      });
    });

    // Calculate averages and format data
    return Object.entries(muscleGroupStats).map(([muscleGroup, stats]) => ({
      muscleGroup,
      totalVolume: Number(stats.totalVolume.toFixed(2)),
      frequency: stats.frequency,
      exerciseVariety: stats.exerciseVariety.size,
      averageIntensity: Number(_.mean(stats.intensityValues).toFixed(2)),
      averageVolumePerSession: Number(
        (stats.totalVolume / stats.frequency).toFixed(2)
      ),
      lastTrainedDate: stats.lastTrainedDate,
      exercises: Array.from(stats.exercises),
    }));
  }

  async analyzeExercises(sessions) {
    const exerciseStats = {};

    // First pass: Collect all performed exercises
    sessions.forEach((session) => {
      session.SessionExercises.forEach((sessionExercise) => {
        const exerciseId = sessionExercise.exercise_id;

        if (!exerciseStats[exerciseId]) {
          exerciseStats[exerciseId] = {
            exerciseId,
            name: sessionExercise.Exercise.name,
            muscleGroups: sessionExercise.Exercise.muscle_group,
            difficultyLevel: sessionExercise.Exercise.difficulty_level,
            totalOccurrences: 0,
            completedOccurrences: 0,
            plannedSets: [],
            completedSets: [],
            completionRate: 0,
            averageWeightIncrease: 0,
          };
        }
      });
    });

    // Second pass: Collect planned exercises data
    sessions.forEach((session) => {
      if (session.WorkoutDay && session.WorkoutDay.PlanExercises) {
        session.WorkoutDay.PlanExercises.forEach((planExercise) => {
          const exerciseId = planExercise.exercise_id;

          if (exerciseStats[exerciseId]) {
            exerciseStats[exerciseId].totalOccurrences++;
            exerciseStats[exerciseId].plannedSets.push({
              sets: planExercise.sets,
              reps: planExercise.reps_target,
              date: session.date,
            });
          }
        });
      }
    });

    // Second pass: Analyze completed exercises
    sessions.forEach((session) => {
      session.SessionExercises.forEach((sessionExercise) => {
        const exerciseId = sessionExercise.exercise_id;

        if (exerciseStats[exerciseId]) {
          exerciseStats[exerciseId].completedOccurrences++;
          exerciseStats[exerciseId].completedSets.push({
            sets: sessionExercise.sets_completed,
            reps: sessionExercise.reps_completed,
            weight: sessionExercise.weight,
            date: session.date,
          });
        }
      });
    });

    // Calculate statistics for each exercise
    return Object.values(exerciseStats).map((exercise) => {
      // Calculate completion rate
      exercise.completionRate =
        exercise.totalOccurrences > 0
          ? Number(
              (
                (exercise.completedOccurrences / exercise.totalOccurrences) *
                100
              ).toFixed(2)
            )
          : 100; // If there was no plan, but exercise was performed, consider it 100% completed

      // Analyze weight progress
      if (exercise.completedSets.length > 1) {
        const sortedSets = _.sortBy(exercise.completedSets, "date");
        const weightChanges = [];

        for (let i = 1; i < sortedSets.length; i++) {
          if (sortedSets[i].weight && sortedSets[i - 1].weight) {
            weightChanges.push(sortedSets[i].weight - sortedSets[i - 1].weight);
          }
        }
      }

      // Calculate average completion relative to plan
      const setSetsCompletion = exercise.completedSets
        .map((completed, index) => {
          const planned = exercise.plannedSets[index];
          if (!planned) return null;

          const setCompletion = (completed.sets / planned.sets) * 100;
          const repCompletion = (completed.reps / planned.reps) * 100;
          return (setCompletion + repCompletion) / 2;
        })
        .filter(Boolean);

      exercise.averagePlanCompletion =
        Number(_.mean(setSetsCompletion).toFixed(2)) || 0;

      return exercise;
    });
  }

  analyzeTrainingPattern(sessions) {
    if (sessions.length < 2) {
      return {
        avgSessionsPerWeek: 0,
        avgSessionDuration: 0,
        mostFrequentWeekday: null,
        avgRestDaysBetweenSessions: 0,
      };
    }

    const firstSession = sessions[0];
    const lastSession = sessions[sessions.length - 1];
    const totalWeeks = Math.max(
      1,
      (new Date(lastSession.date) - new Date(firstSession.date)) /
        (7 * 24 * 60 * 60 * 1000)
    );

    const avgSessionsPerWeek = sessions.length / totalWeeks;
    const avgSessionDuration = _.meanBy(sessions, "duration_minutes");
    const weekdays = sessions.map((session) => new Date(session.date).getDay());
    const mostFrequentWeekday = this.getMostFrequentWeekday(weekdays);

    const restDays = [];
    for (let i = 1; i < sessions.length; i++) {
      const daysBetween =
        (new Date(sessions[i].date) - new Date(sessions[i - 1].date)) /
        (24 * 60 * 60 * 1000);
      restDays.push(daysBetween);
    }
    const avgRestDaysBetweenSessions = _.mean(restDays) || 0;

    return {
      avgSessionsPerWeek: Number(avgSessionsPerWeek.toFixed(1)),
      avgSessionDuration: Math.round(avgSessionDuration || 0),
      mostFrequentWeekday,
      avgRestDaysBetweenSessions: Number(avgRestDaysBetweenSessions.toFixed(1)),
    };
  }

  getMostFrequentWeekday(weekdays) {
    const weekdayCount = _.countBy(weekdays);
    const mostFrequent = _.maxBy(
      Object.entries(weekdayCount),
      ([, count]) => count
    );
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdayNames[mostFrequent?.[0] ?? 0];
  }
}

export default new SessionAnalysisService();
