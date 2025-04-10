import { Schema, model, type Document } from 'mongoose';

interface IComment extends Document {
  commentText: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  thoughtAuthor: string;
  createdAt: Date;
  comments: IComment[];
}

// Define the schema for the Comment subdocument
const commentSchema = new Schema<IComment>(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    thoughtAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
