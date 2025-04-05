// src/models/BlogPost.ts
import mongoose, { Document, model, Types } from 'mongoose';
const { Schema, models } = mongoose;

interface IBlogPost extends Document {
  title: string;
  bodyText: string;
  user: Types.ObjectId;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bodyText: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const BlogPost = models.BlogPost as mongoose.Model<IBlogPost> || model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;