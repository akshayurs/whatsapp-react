import React, { useRef, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
import OpenFullscreen from '../Helpers/OpenFullScreen'
import { GetTime } from '../Helpers/Time'
function ChatItem(props) {
  const { user, clickToSelect, handleSelect } = props
  const toSelect = useRef(false)
  const [selected, setSelected] = useState(false)
  const timeout = useRef(0)
  let startedX = useRef(0)
  let currentX = useRef(0)
  let startedY = useRef(0)
  let currentY = useRef(0)
  useEffect(() => {
    if (!clickToSelect) {
      setSelected(false)
    }
  }, [clickToSelect])
  function handleClick(e) {
    if (clickToSelect) {
      e.preventDefault()
      setSelected((prev) => {
        return !prev
      })
      handleSelect(user.userIndex)
    }
  }
  function handleMessageSelect() {
    if (toSelect.current) {
      setSelected(true)
      handleSelect(user.userIndex)
    }
  }
  function touchstart(e) {
    if (clickToSelect) {
      return
    }
    toSelect.current = true
    e.persist()
    startedX.current = e.touches[0].clientX
    startedY.current = e.touches[0].clientY
    timeout.current = setTimeout(handleMessageSelect, 500)
  }
  function touchmove(e) {
    if (clickToSelect) {
      return
    }
    e.persist()
    currentX.current = e.touches[0].clientX
    currentY.current = e.touches[0].clientY

    let moveX = currentX.current - startedX.current
    let moveY = currentY.current - startedY.current

    if ((moveX > 10 || moveY > 10) && toSelect.current) {
      toSelect.current = false
      clearTimeout(timeout.current)
    }
  }
  function touchend() {
    clearTimeout(timeout.current)
    if (clickToSelect) {
      return
    }
    toSelect.current = false
  }
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
        className={'chat-item ' + (selected ? ' selected ' : '')}
        onTouchStart={touchstart}
        onTouchEnd={touchend}
        onTouchMove={touchmove}
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
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
          <i className="fas fa-check"></i>
        </div>
        <div className="name-container">
          <div className="name">{user.name}</div>
          <div className="lastmessage">
            {lastMessage?.content.replaceAll(/\n/g, ' ')}
          </div>
        </div>
        <div className="time-container">
          <div className="message-time">{GetTime(lastMessage.time)}</div>
          <div className={'lastseen-time ' + onlineClass}>{seen}</div>
        </div>
      </Link>
    </>
  )
}

export default withRouter(ChatItem)
