// src/models/BlogPost.ts
import { Schema, model, Document } from 'mongoose';

interface IBlogPost extends Document {
  title: string;
  bodyText: string;
  user: Schema.Types.ObjectId;
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

const BlogPost = model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;