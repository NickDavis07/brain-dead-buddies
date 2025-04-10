import resolver from '../resolver.js';

const resolvers = {
  Query: {
    ...resolver.Query,
  },
  Mutation: {
    ...resolver.Mutation,
  },
};

export default resolvers;