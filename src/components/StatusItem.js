import React from 'react'
import { Link } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
function StatusItem(props) {
  const user = props.user
  let img = ChangeImage(user.status[user.status.length - 1].img)

  return (
    <Link
      // onClick={() => openFullScreen()}
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
