import { Schema, model, Document } from 'mongoose';

// Define an interface for the SurvivalTip document
interface IComment extends Document {
  commentText: string;
  createdAt: Date;
}

interface ISurvivalTip extends Document {
  tipText: string;
  tipAuthor: string;
  category: string;
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
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

// Define the schema for the SurvivalTip document
const survivalTipSchema = new Schema<ISurvivalTip>(
  {
    tipText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    tipAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Shelter', 'Food', 'Weapons', 'Escape Plans', 'Medical', 'Communication', 'Other'],
      default: 'Other',
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const SurvivalTip = model<ISurvivalTip>('SurvivalTip', survivalTipSchema);

export default SurvivalTip;