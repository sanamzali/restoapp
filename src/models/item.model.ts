import mongoose, { Document, Schema } from 'mongoose';
import { Item } from '../types/items.types';

type IItem = Item & Document;

const itemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: Array<String>, required: true },
    price: { type: Number, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IItem>('Item', itemSchema);
