import mongoose, { Document, Schema } from 'mongoose';
import { Company } from '../types/companies.types';

type ICompany = Company & Document;

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>('Company', CompanySchema);
