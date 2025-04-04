import { Schema, model, Document } from 'mongoose';

// Define an interface for the Post document
interface IPost extends Document {
  title: string;
  bodyText: string;
  password: string;
  user: Schema.Types.ObjectId;
}

// Define the schema for the Post document
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
    user: 
      {
        type: Schema.Types.ObjectId,
        ref: 'SurvivalTip',
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
