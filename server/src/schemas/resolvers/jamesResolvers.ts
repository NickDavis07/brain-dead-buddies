import { Category, Post, } from '../../models/index.js';

interface PostArgs {
  postId: string;
}

interface AddPostArgs {
  title: string;
  bodyText: string;
  userId: string;
}

interface ModifyPostArgs {
  postId: string;
  title?: string;
  bodyText?: string;
}

interface CategoryArgs {
  categoryId: string;
}

interface AddCategoryArgs {
  name: string;
}

interface ModifyCategoryArgs {
  categoryId: string;
  name?: string;
}

interface AssignCategoryArgs {
  postId: string;
  categoryId: string;
}

const resolvers = {
  Query: {
    fetchAllPosts: async () => {
      return await Post.find()
        .sort({ createdAt: -1 })
        .populate('user')
        .populate('categories');
    },
    fetchPost: async (_parent: any, { postId }: PostArgs) => {
      return await Post.findById(postId)
        .populate('user')
        .populate('categories');
    },
    fetchUserPosts: async (_parent: any, { userId }: { userId: string }) => {
      return await Post.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate('categories');
    },
    fetchAllCategories: async () => {
      return await Category.find().sort({ name: 1 });
    },
    fetchCategory: async (_parent: any, { categoryId }: CategoryArgs) => {
      return await Category.findById(categoryId).populate('posts');
    },
    fetchPostsByCategory: async (_parent: any, { categoryId }: CategoryArgs) => {
      const category = await Category.findById(categoryId)
        .populate({
          path: 'posts',
          populate: [
            { path: 'user' },
            { path: 'categories' }
          ]
        });
      return category?.posts || [];
    },
  },
  Mutation: {
    addPost: async (_parent: any, { title, bodyText, userId }: AddPostArgs) => {
      const post = await Post.create({ title, bodyText, user: userId });
      return post.populate('user');
    },
    modifyPost: async (_parent: any, { postId, title, bodyText }: ModifyPostArgs) => {
      return await Post.findByIdAndUpdate(
        postId,
        { title, bodyText },
        { new: true }
      )
      .populate('user')
      .populate('categories');
    },
    removePost: async (_parent: any, { postId }: PostArgs) => {
      await Category.updateMany(
        { posts: postId },
        { $pull: { posts: postId } }
      );
      await Post.findByIdAndDelete(postId);
      return true;
    },
    addCategory: async (_parent: any, { name }: AddCategoryArgs) => {
      return await Category.create({ name });
    },
    modifyCategory: async (_parent: any, { categoryId, name }: ModifyCategoryArgs) => {
      return await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );
    },
    removeCategory: async (_parent: any, { categoryId }: CategoryArgs) => {
      await Post.updateMany(
        { categories: categoryId },
        { $pull: { categories: categoryId } }
      );
      await Category.findByIdAndDelete(categoryId);
      return true;
    },
    assignCategoryToPost: async (_parent: any, { postId, categoryId }: AssignCategoryArgs) => {
      await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { categories: categoryId } },
        { new: true }
      );
      
      await Category.findByIdAndUpdate(
        categoryId,
        { $addToSet: { posts: postId } },
        { new: true }
      );
      
      return Post.findById(postId)
        .populate('user')
        .populate('categories');
    },
    unassignCategoryFromPost: async (_parent: any, { postId, categoryId }: AssignCategoryArgs) => {
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { categories: categoryId } },
        { new: true }
      );
      
      await Category.findByIdAndUpdate(
        categoryId,
        { $pull: { posts: postId } },
        { new: true }
      );
      
      return Post.findById(postId)
        .populate('user')
        .populate('categories');
    },
  },
  Post: {
    categories: async (parent: any) => {
      return await parent.populate('categories').execPopulate().categories;
    },
    user: async (parent: any) => {
      return await parent.populate('user').execPopulate().user;
    }
  },
  Category: {
    posts: async (parent: any) => {
      return await parent.populate('posts').execPopulate().posts;
    }
  }
};

export default resolvers;