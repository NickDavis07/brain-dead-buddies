import { SurvivalTip, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface SurvivalTipArgs {
  survivalTipId: string;
}

interface CategoryArgs {
  category: string;
}

interface AddSurvivalTipArgs {
  input:{
    tipText: string;
    tipAuthor: string;
    category: string;
  }
}

interface AddCommentArgs {
  survivalTipId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  survivalTipId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('survivalTip');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('survivalTip');
    },
    survivalTips: async () => {
      return await SurvivalTip.find().sort({ createdAt: -1 });
    },
    survivalTip: async (_parent: any, { survivalTipId }: SurvivalTipArgs) => {
      return await SurvivalTip.findOne({ _id: survivalTipId });
    },
    survivalTipsByCategory: async (_parent: any, { category }: CategoryArgs) => {
      return await SurvivalTip.find({ category }).sort({ createdAt: -1 });
    },
    // Query to get the authenticated user's information
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their survivalTip
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('survivalTip');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    checklist: async () => {
      // Return an empty array by default
      return [];
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addSurvivalTip: async (_parent: any, { input }: AddSurvivalTipArgs, context: any) => {
      if (context.user) {
        const survivalTip = await SurvivalTip.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { survivalTips: survivalTip._id } }
        );

        return survivalTip;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (_parent: any, { survivalTipId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return SurvivalTip.findOneAndUpdate(
          { _id: survivalTipId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSurvivalTip: async (_parent: any, { survivalTipId }: SurvivalTipArgs, context: any) => {
      if (context.user) {
        const survivalTip = await SurvivalTip.findOneAndDelete({
          _id: survivalTipId,
          tipAuthor: context.user.username,
        });

        if(!survivalTip){
          throw new AuthenticationError('Tip not found or you are not authorized to delete it.');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { survivalTips: survivalTip._id } }
        );

        return survivalTip;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (_parent: any, { survivalTipId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return SurvivalTip.findOneAndUpdate(
          { _id: survivalTipId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;