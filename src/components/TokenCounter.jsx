import { useState } from 'react'
import './TokenCounter.css'

function TokenCounter() {
  const [waiting, setWaiting] = useState(0)
  const [serving, setServing] = useState(1)

  const MAX = 50

  const handleEntry = () => {
    if (waiting < MAX) setWaiting(waiting + 1)
  }

  const handleExit = () => {
    if (waiting > 0) {
      setWaiting(waiting - 1)
      setServing(serving + 1)
    }
  }

  const handleReset = () => {
    setWaiting(0)
    setServing(1)
  }

  const getStatus = () => {
    if (waiting === MAX) return { msg: 'House Full!', cls: 'status-full' }
    if (waiting >= 40) return { msg: 'Almost Full!', cls: 'status-warn' }
    if (waiting === 0) return { msg: 'All Clear!', cls: 'status-ok' }
    return { msg: 'Tokens Active', cls: 'status-active' }
  }

  const status = getStatus()
  const fillPercent = (waiting / MAX) * 100

  return (
    <div className="wrapper">
      <div className="card">

        <div className="card-header">
          <h1 className="title">🍽️ Restaurant Token</h1>
          <p className="subtitle">Slot Management System</p>
        </div>

        <div className={`status-badge ${status.cls}`}>
          {status.msg}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <p className="progress-label">{waiting} / {MAX} slots filled</p>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Now Serving</span>
            <span className="stat-number serving">{serving}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Waiting</span>
            <span className="stat-number waiting">{waiting}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Available</span>
            <span className="stat-number available">{MAX - waiting}</span>
          </div>
        </div>

        <div className="btn-group">
          <button
            className="btn btn-entry"
            onClick={handleEntry}
            disabled={waiting === MAX}
          >
            + Entry
          </button>
          <button
            className="btn btn-exit"
            onClick={handleExit}
            disabled={waiting === 0}
          >
            - Exit
          </button>
          <button
            className="btn btn-reset"
            onClick={handleReset}
          >
            ↺ Reset
          </button>
        </div>

        {waiting === MAX && (
          <p className="bottom-msg full">
            No more tokens! Please wait outside.
          </p>
        )}
        {waiting === 0 && (
          <p className="bottom-msg ok">
            Walk in directly — no waiting!
          </p>
        )}

      </div>
    </div>
  )
}

export default TokenCounter