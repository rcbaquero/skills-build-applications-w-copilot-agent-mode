import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await LeaderboardEntry.deleteMany({});

    const teamAlpha = await Team.create({
      name: 'Velocity Squad',
      description: 'High-energy training group focused on endurance and mobility.',
      members: [],
      isActive: true,
    });

    const users = await User.insertMany([
      {
        username: 'avafit',
        email: 'ava@example.com',
        passwordHash: 'hashed-password-ava',
        firstName: 'Ava',
        lastName: 'Stone',
        fitnessLevel: 'advanced',
        avatar: 'https://example.com/ava.png',
        teamId: teamAlpha._id,
      },
      {
        username: 'noahgrow',
        email: 'noah@example.com',
        passwordHash: 'hashed-password-noah',
        firstName: 'Noah',
        lastName: 'Green',
        fitnessLevel: 'intermediate',
        avatar: 'https://example.com/noah.png',
        teamId: teamAlpha._id,
      },
      {
        username: 'miarun',
        email: 'mia@example.com',
        passwordHash: 'hashed-password-mia',
        firstName: 'Mia',
        lastName: 'Wells',
        fitnessLevel: 'beginner',
        avatar: 'https://example.com/mia.png',
        teamId: teamAlpha._id,
      },
    ]);

    teamAlpha.members = users.map((user) => user._id);
    teamAlpha.captainId = users[0]._id;
    await teamAlpha.save();

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 42,
        caloriesBurned: 540,
        distanceKm: 7.4,
        date: new Date(),
        notes: 'Tempo run',
      },
      {
        userId: users[1]._id,
        type: 'lift',
        durationMinutes: 60,
        caloriesBurned: 420,
        date: new Date(),
        notes: 'Upper body strength',
      },
      {
        userId: users[2]._id,
        type: 'walk',
        durationMinutes: 30,
        caloriesBurned: 150,
        distanceKm: 3.2,
        date: new Date(),
        notes: 'Recovery walk',
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Hill Sprint Intervals',
        category: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 28,
        equipment: ['Timer'],
        instructions: ['Warm up for 5 minutes', 'Sprint up hill for 30 seconds', 'Recover 60 seconds'],
      },
      {
        name: 'Core and Stability Flow',
        category: 'recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        equipment: ['Mat'],
        instructions: ['Plank for 30 seconds', 'Dead bug x 10', 'Bird dog x 12 per side'],
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, username: 'avafit', score: 1280, rank: 1, trend: 'up', teamName: 'Velocity Squad' },
      { userId: users[1]._id, username: 'noahgrow', score: 1195, rank: 2, trend: 'steady', teamName: 'Velocity Squad' },
      { userId: users[2]._id, username: 'miarun', score: 1108, rank: 3, trend: 'up', teamName: 'Velocity Squad' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
