import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
import OpenFullscreen from '../Helpers/OpenFullScreen'
function ChatItem(props) {
  const user = props.user

  if (
    user.chatsList.length === 0 ||
    (user.chatsList.length === 1 && user.chatsList[0].type === 0)
  ) {
    return ''
  }

  let onlineClass = ''
  let seen = ''
  if (user.isOnline) {
    onlineClass = 'online'
    seen = 'online'
  } else {
    seen = user.lastSeen
  }
  let lastMessage = user.chatsList[user.chatsList.length - 1]
  if (lastMessage.type === 0 && user.chatsList.length > 1) {
    lastMessage = user.chatsList[user.chatsList.length - 2]
  }
  return (
    <>
      <Link
        onClick={() => OpenFullscreen()}
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
            <img
              src={ChangeImage(user.profile)}
              className="online"
              alt="profile Icon"
            />
          </div>
        </div>
        <div className="name-container">
          <div className="name">{user.name}</div>
          <div className="lastmessage">
            {lastMessage?.content.replaceAll(/\n/g, ' ')}
          </div>
        </div>
        <div className="time-container">
          <div className="message-time">{lastMessage.time}</div>
          <div className={'lastseen-time ' + onlineClass}>{seen}</div>
        </div>
      </Link>
    </>
  )
}

export default withRouter(ChatItem)
