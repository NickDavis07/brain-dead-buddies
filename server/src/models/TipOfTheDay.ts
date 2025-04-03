import { Schema, model, Document } from 'mongoose';

interface ITipOfTheDay extends Document {
  text: string;
  author: string;
  category: string;
  date: Date;
}

const tipOfTheDaySchema = new Schema<ITipOfTheDay>({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Shelter', 'Food', 'Weapons', 'Escape Plans', 'Medical', 'Communication', 'Other'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TipOfTheDay = model<ITipOfTheDay>('TipOfTheDay', tipOfTheDaySchema);

export default TipOfTheDay;