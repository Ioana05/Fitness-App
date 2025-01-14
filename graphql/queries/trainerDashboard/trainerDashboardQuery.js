import { GraphQLInt } from "graphql";
import TrainerDashboardType from "../../types/trainerDashboard/trainerDashboardType.js";
import TrainerDashboardService from "../../../core/services/trainerDashboardService.js";

const trainerDashboardQueryResolver = async (_, { trainerId }) => {
  return await TrainerDashboardService.getTrainerDashboard(trainerId);
};

const trainerDashboardQuery = {
  type: TrainerDashboardType,
  args: {
    trainerId: { type: GraphQLInt },
  },
  resolve: trainerDashboardQueryResolver,
};

export default trainerDashboardQuery;
