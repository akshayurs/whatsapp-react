import React from 'react'
import { Link } from 'react-router-dom'

function CallItem(props) {
  const call = props.call
  const user = props.user

  const red = call.isMissed ? 'red' : ''
  const direction = call.isIncomming ? 'incomming' : 'outgoing'
  let img = user.profile
  if (!/^http/.test(img)) {
    img = '/img/' + img
  }
  return (
    <Link to={`/contactabout/${user.userIndex}`} className="call-item">
      <img src={img} alt="profile Icon" />
      <div className="container">
        <div className="name">{user.name}</div>
        <div className="details">
          <span className={'arrow ' + red + ' ' + direction}>
            <i className="fas fa-long-arrow-alt-right"></i>
          </span>
          <span className="time">{call.time}</span>
        </div>
      </div>
      {call.isVideo ? (
        <i className="fas fa-2x fa-video icon"></i>
      ) : (
        <i className="fas fa-2x fa-phone-alt icon"></i>
      )}
    </Link>
  )
}

export default CallItem
