import { parseISO, isAfter } from "date-fns";
import db from "../../models/index.js";

class TrainerDashboardService {
  // Helper method to safely parse dates
  safeParseDateISO(dateString) {
    try {
      if (!dateString) return new Date();

      // If it's already a Date object
      if (dateString instanceof Date) return dateString;

      // Try to parse the date
      const parsedDate = parseISO(dateString);

      // Check if the parsed date is valid
      if (isNaN(parsedDate.getTime())) {
        return new Date();
      }

      return parsedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date();
    }
  }

  async getTrainerDashboard(trainerId) {
    try {
      // Get trainer and their clients
      const trainerClients = await db.TrainerClient.findAll({
        where: { trainer_id: trainerId },
        include: [db.User],
      });

      const trainer = await db.Trainer.findOne({
        where: { id: trainerId },
      });

      /*
      workout session joined with user table and trainer client table
      where the trainer_id is equal to the trainerId
      */
        const query = `
        SELECT 1
        FROM WorkoutSessions ws, Users u, TrainerClients tc
        WHERE ws.user_id = u.id
        AND u.id = tc.client_id
        AND tc.trainer_id = ${trainerId}
        `;
        const workoutSessions = await db.sequelize.query(query, {
            type: db.Sequelize.QueryTypes.SELECT,
        });

      if (!trainer) {
        throw new Error("Trainer not found");
      }

      const hourlyRate = trainer.hourly_rate || 0;

      // Calculate trainer metrics
      const trainerMetrics = await this.calculateTrainerMetrics(
        trainerClients,
        hourlyRate,
        workoutSessions
      );

      // Calculate client analysis for each client
      const clientsAnalysis = await Promise.all(
        trainerClients.map((client) => this.analyzeClient(client, hourlyRate))
      );

      return {
        trainerMetrics,
        clientsAnalysis,
      };
    } catch (error) {
      console.error("Error in getTrainerDashboard:", error);
      throw error;
    }
  }

  async calculateTrainerMetrics(trainerClients, hourlyRate, sessions) {
    const activeClients = trainerClients.filter((client) => {
      return (
        client.session_remaining > 0
      );
    });

    const pastSessions = sessions.length;
    const earnedRevenue = pastSessions * hourlyRate;

    const projectedRevenue = trainerClients.reduce((sum, client) => {
      const remainingSessions = client.session_remaining || 0;
      return sum + remainingSessions * hourlyRate;
    }, 0);

    // Calculate average retention
    const avgRetention = activeClients.length / trainerClients.length;

    return {
      totalClients: trainerClients.length,
      activeClients: activeClients.length,
      earnedRevenue,
      projectedRevenue,
      averageClientRetention: avgRetention || 0,
    };
  }

  async analyzeClient(clientData, hourlyRate) {
    try {
      const client = clientData.User;

      if (!client) {
        throw new Error("Client data not found");
      }

      // Get client's workout plans
      const workoutPlans = await db.WorkoutPlan.findAll({
        where: { client_id: client.id },
      });

      // Get client's workout sessions
      const workoutSessions = await db.WorkoutSession.findAll({
        where: { user_id: client.id },
        order: [["date", "DESC"]],
      });

      // Get all goals across all workout plans
      const goals = await db.PlanGoal.findAll({
        where: {
          workout_plan_id: {
            [db.Sequelize.Op.in]: workoutPlans.map((plan) => plan.id),
          },
        },
      });

      return {
        client: {
          id: client.id,
          first_name: client.first_name,
          last_name: client.last_name,
          age: client.age,
          gender: client.gender,
          email: client.email,
        },
        sessionSummary: this.calculateSessionSummary(
          workoutSessions,
          clientData
        ),
        goalsProgress: this.calculateGoalsProgress(goals),
        finnancialSummary: this.calculateFinancialSummary(
          clientData,
          hourlyRate,
          workoutSessions
        ),
        adherenceMetrics: this.calculateAdherenceMetrics(workoutSessions),
        clientType: this.determineClientType(clientData),
      };
    } catch (error) {
      console.error("Error in analyzeClient:", error);
      throw error;
    }
  }

  determineClientType(clientData) {
    return clientData.session_remaining > 0 ? 0 : 1;
    }

  calculateSessionSummary(sessions, clientData) {
    const completedSessions = sessions.length;
    const remaining = clientData.session_remaining || 0;
    const total = completedSessions + remaining;

    const lastSession = sessions[0];

    // Calculate average duration and round to nearest integer
    let avgDuration = 0;
    if (completedSessions > 0) {
      const totalDuration = sessions.reduce(
        (sum, session) => sum + (session.duration_minutes || 0),
        0
      );
      avgDuration = Math.round(totalDuration / completedSessions);
    }

    return {
      totalSessions: total,
      completedSessions,
      remainingSessions: remaining,
      completionRate: total > 0 ? (completedSessions / total) * 100 : 0,
      averageSessionDuration: avgDuration,
      lastSessionDate: lastSession
        ? this.safeParseDateISO(lastSession.date)
        : null,
    };
  }

  calculateGoalsProgress(goals) {
    const totalGoals = goals.length;
    const completedGoals = goals.filter(
      (goal) => goal.status === "COMPLETE"
    ).length;
    const atRiskGoals = goals.filter((goal) => {
      const deadline = this.safeParseDateISO(goal.deadline);
      return isAfter(new Date(), deadline) && goal.status !== "COMPLETE";
    }).length;

    return {
      totalGoals,
      completedGoals,
      onTrackGoals: totalGoals - completedGoals - atRiskGoals,
      atRiskGoals,
      completionRate: totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0,
    };
  }

  calculateFinancialSummary(clientData, hourlyRate, sessions) {
    const endDate = this.safeParseDateISO(clientData.end_date);
    const completedSessions = sessions.length;
    const remainingSessions = clientData.session_remaining || 0;

    return {
      totalRevenue: completedSessions * hourlyRate,
      projectedRevenue: remainingSessions * hourlyRate,
      sessionRate: hourlyRate,
      contractEndDate: endDate,
    };
  }

  calculateAdherenceMetrics(sessions) {
    const lastSession = sessions[0];

    return {
      avgSessionsPerWeek: sessions.length / 4,
      lastFeedback: lastSession?.notes || null,
      lastFeedbackDate: lastSession
        ? this.safeParseDateISO(lastSession.date)
        : null,
    };
  }
}

// Initialize service
const trainerDashboardService = new TrainerDashboardService();
export default trainerDashboardService;
