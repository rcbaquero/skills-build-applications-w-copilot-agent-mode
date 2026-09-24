import mongoose, { Schema } from 'mongoose';

export interface IWorkout {
  name: string;
  category: 'cardio' | 'strength' | 'recovery' | 'mobility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  equipment: string[];
  instructions: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'recovery', 'mobility'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
