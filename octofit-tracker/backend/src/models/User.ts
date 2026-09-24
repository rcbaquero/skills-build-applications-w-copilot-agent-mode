import mongoose, { Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  avatar?: string;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    avatar: { type: String },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
