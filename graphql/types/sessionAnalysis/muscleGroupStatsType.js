import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";


const MuscleGroupStatsType = new GraphQLObjectType({
  name: "MuscleGroupStats",
  fields: {
    muscleGroup: { type: GraphQLString },
    totalVolume: { type: GraphQLFloat },
    frequency: { type: GraphQLInt },
    exerciseVariety: { type: GraphQLInt },
    averageIntensity: { type: GraphQLFloat },
    averageVolumePerSession: { type: GraphQLFloat },
    lastTrainedDate: { type: GraphQLString },
    exercises: { type: new GraphQLList(GraphQLString) },
  },
});

export default MuscleGroupStatsType;