import jamesResolvers from './jamesResolvers.js';
import stephanieResolvers from './stephanieResolvers.js';

const validJamesQueryResolvers = {
  fetchAllPosts: jamesResolvers.Query.fetchAllPosts,
  fetchPost: jamesResolvers.Query.fetchPost,
  fetchUserPosts: jamesResolvers.Query.fetchUserPosts,
  fetchAllCategories: jamesResolvers.Query.fetchAllCategories,
  fetchCategory: jamesResolvers.Query.fetchCategory,
  fetchPostsByCategory: jamesResolvers.Query.fetchPostsByCategory,
};

const resolvers = {
  Query: {
    ...validJamesQueryResolvers,
    ...stephanieResolvers.Query,
  },
  Mutation: {
    ...jamesResolvers.Mutation,
    ...stephanieResolvers.Mutation,
  },
  // Include these type resolvers from James's file
  Post: jamesResolvers.Post,
  Category: jamesResolvers.Category
};

export default resolvers;