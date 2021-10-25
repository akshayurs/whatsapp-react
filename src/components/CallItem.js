import React from 'react'
import { withRouter } from 'react-router-dom'
import { GetDayAndMonth, GetTime } from '../Helpers/Time'
import ChangeImage from '../Helpers/ChangeImage'
function CallItem(props) {
  const call = props.call
  const user = props.user
  
  const red = call.isMissed ? 'red' : ''
  const direction = call.isIncomming ? 'incomming' : 'outgoing'
  let img = ChangeImage(user.profile)
  return (
    <div
      className="call-item"
      onClick={() => {
        props.history.push(`/contactabout/${user.userIndex}`)
      }}
    >
      <img src={img} alt="profile Icon" />
      <div className="container">
        <div className="name">{user.name}</div>
        <div className="details">
          <span className={'arrow ' + red + ' ' + direction}>
            <i className="fas fa-long-arrow-alt-right"></i>
          </span>
          <span className="time">{`${GetDayAndMonth(call.time)}, ${GetTime(
            call.time
          )}`}</span>
        </div>
      </div>
      {call.isVideo ? (
        <i
          className="fas fa-2x fa-video icon"
          onClick={(e) => {
            e.stopPropagation()
            props.history.push(`/videocall/${user.userIndex}`)
          }}
        ></i>
      ) : (
        <i
          className="fas fa-2x fa-phone-alt icon"
          onClick={(e) => {
            e.stopPropagation()
            props.history.push(`/voicecall/${user.userIndex}`)
          }}
        ></i>
      )}
    </div>
  )
}

export default withRouter(CallItem)
