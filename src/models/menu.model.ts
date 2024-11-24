import mongoose, { Document, Schema } from 'mongoose';
import { Menu } from '../types/menus.types';

const sectionSchema: Schema = new Schema({
  name: { type: String, required: true },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
      itemIndex: { type: Number, required: true },
    },
  ],
  sectionIndex: { type: Number, required: true },
});

type IMenu = Menu & Document;

const menuSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    // sub document sections
    sections: [sectionSchema],
    branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMenu>('Menu', menuSchema);
