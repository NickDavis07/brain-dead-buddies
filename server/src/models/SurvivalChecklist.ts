import { Schema, model, Document } from 'mongoose';

interface IChecklistItem extends Document {
  text: string;
  completed: boolean;
  userId: string; // Associate checklist items with a user
  priority: 'Low' | 'Medium' | 'High'; // Add priority field
}

const checklistItemSchema = new Schema<IChecklistItem>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
  },
  {
    timestamps: true,
  }
);

const ChecklistItem = model<IChecklistItem>('ChecklistItem', checklistItemSchema);

export default ChecklistItem;