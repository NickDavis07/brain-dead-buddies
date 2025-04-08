import jamesResolvers from './jamesResolvers.js';
import stephanieResolvers from './stephanieResolvers.js';

const resolvers = {
    Query: {
      ...jamesResolvers.Query,
      ...stephanieResolvers.Query,
    },
    Mutation: {
      ...jamesResolvers.Mutation,
      ...stephanieResolvers.Mutation,
    },
  };
  
  export default resolvers;