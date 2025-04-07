// src/models/Post.ts
import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  bodyText: string;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
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
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Post = model<IPost>('Post', postSchema);

export default Post;