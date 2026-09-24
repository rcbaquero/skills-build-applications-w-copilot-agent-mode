import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const dashboardStats = [
  { label: 'Active athletes', value: '1,248' },
  { label: 'Teams', value: '84' },
  { label: 'Weekly streaks', value: '92%' },
]

const leaderboard = [
  { name: 'Ava', points: 1280, badge: '🥇' },
  { name: 'Noah', points: 1195, badge: '🥈' },
  { name: 'Mia', points: 1108, badge: '🥉' },
]

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <span className="badge text-bg-primary-subtle text-primary-emphasis rounded-pill mb-3 px-3 py-2">
            OctoFit Tracker
          </span>
          <h1 className="display-4 fw-bold mb-3">Rise stronger every day.</h1>
          <p className="lead text-secondary mb-4">
            Track workouts, build healthy habits, and compete with your team in a modern fitness experience.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button type="button" className="btn btn-primary btn-lg px-4">
              Start tracking
            </button>
            <button type="button" className="btn btn-outline-primary btn-lg px-4">
              View leaderboard
            </button>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-4 p-3">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <p className="text-uppercase small text-muted mb-1">Today</p>
                  <h2 className="h4 mb-0">Workout summary</h2>
                </div>
                <img src="/octofitapp-small.png" alt="OctoFit app logo" className="app-logo" />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Cardio</span>
                  <strong>72%</strong>
                </div>
                <div className="progress" role="progressbar" aria-label="Cardio progress">
                  <div className="progress-bar bg-success" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Strength</span>
                  <strong>68%</strong>
                </div>
                <div className="progress" role="progressbar" aria-label="Strength progress">
                  <div className="progress-bar bg-primary" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Recovery</span>
                  <strong>91%</strong>
                </div>
                <div className="progress" role="progressbar" aria-label="Recovery progress">
                  <div className="progress-bar bg-warning" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        {dashboardStats.map((stat) => (
          <div className="col-md-4" key={stat.label}>
            <div className="card border-0 shadow-sm h-100 rounded-4">
              <div className="card-body text-center py-4">
                <h3 className="display-6 fw-bold mb-2">{stat.value}</h3>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LeaderboardPage() {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <p className="text-uppercase small text-primary mb-1">Community</p>
            <h1 className="h2 mb-0">Leaderboard</h1>
          </div>
          <button type="button" className="btn btn-primary">
            Refresh
          </button>
        </div>

        <div className="list-group list-group-flush">
          {leaderboard.map((member) => (
            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3" key={member.name}>
              <div className="d-flex align-items-center gap-3">
                <span className="fs-4">{member.badge}</span>
                <div>
                  <h3 className="h5 mb-0">{member.name}</h3>
                  <small className="text-muted">This week</small>
                </div>
              </div>
              <span className="fw-bold text-primary">{member.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-subtle border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit small logo" className="app-logo-nav" />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto d-flex gap-3">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
