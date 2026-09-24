import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    trend: { type: String, enum: ['up', 'down', 'steady'], default: 'steady' },
    teamName: { type: String, trim: true },
}, { timestamps: true });
export const LeaderboardEntry = mongoose.models.LeaderboardEntry ||
    mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
