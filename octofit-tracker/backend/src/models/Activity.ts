import mongoose, { Schema } from 'mongoose';

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: 'run' | 'ride' | 'lift' | 'swim' | 'walk' | 'yoga';
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'ride', 'lift', 'swim', 'walk', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
