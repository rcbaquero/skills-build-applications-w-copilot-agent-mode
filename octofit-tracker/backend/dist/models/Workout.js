import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
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
}, { timestamps: true });
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
