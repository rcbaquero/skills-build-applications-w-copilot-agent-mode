import mongoose, { Schema } from 'mongoose';

export interface ITeam {
  name: string;
  description?: string;
  captainId?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  isActive: boolean;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
