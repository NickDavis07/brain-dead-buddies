import typeDefs from './typeDefs.js';
import resolvers from './resolver.js';

const mergedResolvers = {
    Query: {
      ...resolvers.Query,
    },
    Mutation: {
      ...resolvers.Mutation,
    },
  };

export { typeDefs, mergedResolvers as resolvers };
