import mongoose, { Document, Schema } from 'mongoose';
import { Branch } from '../types/branch.types';
type IBranch = Branch & Document;

const BranchSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBranch>('Branch', BranchSchema);
