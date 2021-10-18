import React, { useContext } from 'react'
import { FullScreenContext } from '../FullScreenContext'
import { Link } from 'react-router-dom'
function StatusItem(props) {
  const openFullScreen = useContext(FullScreenContext)
  const user = props.user
  let img = user.status[user.status.length - 1].img
  if (!/^http/.test(img)) {
    img = '/img/' + img
  }
  return (
    <Link
      onClick={() => openFullScreen()}
      to={`/statusview/${user.userIndex}`}
      className="status-item"
    >
      <div className="image">
        <img src={img} alt="status" />
      </div>
      <div className="container">
        <div className="name">{user.name}</div>
        <div className="time">{user.status[user.status.length - 1].time}</div>
      </div>
    </Link>
  )
}

export default StatusItem
