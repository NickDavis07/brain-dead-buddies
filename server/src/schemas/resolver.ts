import { SurvivalTip, User, TipOfTheDay, Post, Category } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import ChecklistItem from '../models/SurvivalChecklist.js';

// Define types for the arguments
interface AddUserArgs {
    input: {
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
    input: {
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

interface ToggleChecklistItemArgs {
    id: string;
    completed: boolean;
}
interface PostArgs {
    postId: string;
}

interface AddPostArgs {
    input: { 
        title: string;
        bodyText: string;
        user: string;
    }
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
        checklist: async (_parent: any, _args: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            // Fetch checklist items for the logged-in user
            return await ChecklistItem.find({ userId: context.user._id });
        },
        tipOfTheDay: async () => {
            // Get today's date at 00:00:00
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Check if we already have a tip for today
            let todaysTip = await TipOfTheDay.findOne({
                date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
            });

            // If no tip exists for today, create one
            if (!todaysTip) {
                // Get a random tip from SurvivalTips collection
                const tipsCount = await SurvivalTip.countDocuments();
                const randomIndex = Math.floor(Math.random() * tipsCount);
                const randomTip = await SurvivalTip.findOne().skip(randomIndex);

                if (randomTip) {
                    todaysTip = await TipOfTheDay.create({
                        text: randomTip.tipText,
                        author: randomTip.tipAuthor,
                        category: randomTip.category,
                        date: today
                    });
                }
            }

            return todaysTip;
        },
        fetchAllPosts: async () => {
            return await Post.find()
                .sort({ createdAt: -1 })
                .populate('user')
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

                if (!survivalTip) {
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
        addChecklistItem: async (_parent: any, { text, priority }: { text: string; priority: string }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const newItem = await ChecklistItem.create({
                text,
                userId: context.user._id,
                priority,
            });

            return newItem;
        },
        toggleChecklistItem: async (_parent: any, { id, completed }: ToggleChecklistItemArgs, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            // Update the completed status of the checklist item
            const updatedItem = await ChecklistItem.findOneAndUpdate(
                { _id: id, userId: context.user._id },
                { completed },
                { new: true }
            );

            if (!updatedItem) {
                throw new Error('Checklist item not found or you are not authorized to update it.');
            }

            return updatedItem;
        },
        deleteChecklistItem: async (_parent: any, { id }: { id: string }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            // Find and delete the checklist item
            const deletedItem = await ChecklistItem.findOneAndDelete({
                _id: id,
                userId: context.user._id, // Ensure the item belongs to the logged-in user
            });

            if (!deletedItem) {
                throw new Error('Checklist item not found or you are not authorized to delete it.');
            }

            return deletedItem;
        },
        updateChecklistPriority: async (_parent: any, { id, priority }: { id: string; priority: string }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedItem = await ChecklistItem.findOneAndUpdate(
                { _id: id, userId: context.user._id },
                { priority },
                { new: true }
            );

            if (!updatedItem) {
                throw new Error('Checklist item not found or you are not authorized to update it.');
            }

            return updatedItem;
        },
        addPost: async (_parent: any, { input }: AddPostArgs) => {
            console.log('Adding post:', input);
            const post = await Post.create({ title: input.title, bodyText: input.bodyText, user: input.user });
            return post;
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
};

export default resolvers;