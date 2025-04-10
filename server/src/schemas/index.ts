import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const mergedResolvers = {
    Query: {
      ...resolvers.Query,
    },
    Mutation: {
      ...resolvers.Mutation,
    },
  };

export { typeDefs, mergedResolvers as resolvers };
export * from './typeDefs.js';