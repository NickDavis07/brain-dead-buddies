// src/models/BlogPost.ts
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

interface IBlogPost extends mongoose.Document {
  title: string;
  content: string;
  categories?: mongoose.Schema.Types.ObjectId[];
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const BlogPost = models.BlogPost as mongoose.Model<IBlogPost> || model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
