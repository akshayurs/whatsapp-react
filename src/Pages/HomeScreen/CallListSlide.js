import React, { useContext } from 'react'
import CallItem from '../../components/CallItem'
import { UserContext } from '../../Helpers/UserContext'
import { SortByKey } from '../../Helpers/Sort'
function CallListSlide() {
  const appState = useContext(UserContext)
  const calls = []
  appState.forEach((user) => {
    user.calls.forEach((call) => {
      calls.push({ user, call })
    })
  })
  const sortedCalls = SortByKey(calls, ['call', 'time'], false)
  return (
    <>
      <div className="slide-item calls-list">
        {sortedCalls.map((call, index) => (
          <CallItem
            key={index + '-' + call.user.userIndex}
            call={call.call}
            user={call.user}
          />
        ))}
      </div>
    </>
  )
}

export default CallListSlide
