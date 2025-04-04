// src/models/BlogPost.ts
import { Schema, model, Document } from 'mongoose';

// Interface matching your Category.ts style
interface IBlogPost extends Document {
  title: string;
  content: string;
  categories?: Schema.Types.ObjectId[]; // Optional if you want to categorize posts later
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

const BlogPost = model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;