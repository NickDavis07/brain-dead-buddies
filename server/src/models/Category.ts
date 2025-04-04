import { Schema, model, Document } from 'mongoose';


// Define an interface for the Category document
interface ICategory extends Document {
  name: string;
  posts: Schema.Types.ObjectId[];
}

// Define the schema for the Category document
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);


const Category = model<ICategory>('Category', categorySchema);

export default Category;
