import React, { useContext } from 'react'
import StatusItem from './StatusItem'
import { UserContext } from '../UserContext'

function StatusListSlide() {
  const appState = useContext(UserContext)
  return (
    <div className="slide-item status-screen">
      <label htmlFor="camerainput">
        <div className="add-status">
          <div className="image">
            <img src="/img/user.jpg" alt="status" />
            <i className="fas fa-plus"></i>
          </div>
          <div className="container">
            <h2>My status</h2>
            <h3>Tap to add status update</h3>
          </div>
        </div>
      </label>
      {appState.some((user) => !user.statusViewed) ? (
        <h2 className="title recent-status-title">Recent updates</h2>
      ) : (
        ''
      )}
      <div className="recent-status-container">
        {appState.map((user) =>
          !user.statusViewed ? (
            <StatusItem key={user.userIndex} user={user} />
          ) : (
            ''
          )
        )}
      </div>
      {appState.some((user) => user.statusViewed) ? (
        <h2 className="title viewed-status-title">Viewed updates</h2>
      ) : (
        ''
      )}

      <div className="viewed-status-container">
        {appState.map((user) =>
          user.statusViewed ? (
            <StatusItem key={user.userIndex} user={user} />
          ) : (
            ''
          )
        )}
      </div>
    </div>
  )
}

export default StatusListSlide
