import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FullScreenContext } from '../FullScreenContext'
function ChatItem(props) {
  const user = props.user
  const openFullScreen = useContext(FullScreenContext)
  let onlineClass = ''
  let seen = ''
  if (user.isOnline) {
    onlineClass = 'online'
    seen = 'online'
  } else {
    seen = user.lastSeen
  }
  let img = user.profile
  if (!/^http/.test(img)) {
    img = '/img/' + img
  }
  return (
    <>
      <Link
        onClick={() => openFullScreen()}
        to={`/chatscreen/${user.userIndex}`}
        className="chat-item"
      >
        <div className={'profile-picture ' + onlineClass}>
          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.push(`/contactabout/${user.userIndex}`)
            }}
          >
            <img src={img} className="online" alt="profile Icon" />
          </div>
        </div>
        <div className="name-container">
          <div className="name">{user.name}</div>
          <div className="lastmessage">
            {user.chatsList[user.chatsList.length - 1]?.content.replaceAll(
              /\n/g,
              ' '
            )}
          </div>
        </div>
        <div className="time-container">
          <div className="message-time">
            {user.chatsList[user.chatsList.length - 1].time}
          </div>
          <div className={'lastseen-time ' + onlineClass}>{seen}</div>
        </div>
      </Link>
    </>
  )
}

export default withRouter(ChatItem)
