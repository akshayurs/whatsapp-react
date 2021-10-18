import React, { useContext } from 'react'
import CallItem from './CallItem'
import { UserContext } from '../UserContext'

function CallListSlide() {
  const appState = useContext(UserContext)
  return (
    <>
      <div className="slide-item calls-list">
        {appState.map((user) =>
          user.calls.map((call, index) => (
            <CallItem key={index} call={call} user={user} />
          ))
        )}
      </div>
    </>
  )
}

export default CallListSlide
