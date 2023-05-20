const { Tech, Matchup } = require("../models");

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async () => {
      return Matchup.find({});
    },
    matchup: async (parent, { _id }) => {
      return Matchup.findById(_id);
    },
  },
  Mutation: {
    createMatchup: async (parent, { tech1, tech2 }) => {
      const matchup = await Matchup.create({ tech1, tech2 });
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const matchup = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );

      return matchup;
    },
  },
};

module.exports = resolvers;
