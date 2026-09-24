import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    ok: true,
    api: 'OctoFit Tracker API',
    status: 'online',
    baseUrl,
    port: 8000,
  });
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find({}).populate('members').sort({ createdAt: -1 }).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find({}).sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts', error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1, rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const [userCount, teamCount, activityCount, workoutCount] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Workout.countDocuments(),
    ]);

    res.json({
      users: userCount,
      teams: teamCount,
      activities: activityCount,
      workouts: workoutCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch stats', error });
  }
});

export default router;
