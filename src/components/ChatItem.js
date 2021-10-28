import React, { useRef, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
import OpenFullscreen from '../Helpers/OpenFullScreen'
import { GetTime, GetDayAndMonth, SameDay } from '../Helpers/Time'
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
    const day = GetDayAndMonth(user.lastSeen)
    if (day === 'Today') {
      seen = `today at ${GetTime(user.lastSeen)}`
    } else {
      seen = `${day}, ${GetTime(user.lastSeen)}`
    }
  }
  let lastMessage = user.chatsList[user.chatsList.length - 1]

  let tick = ''
  if (lastMessage.type === 2) {
    tick = (
      <div className="tick">
        <div className={'single ' + (lastMessage.status === 0 ? 'active' : '')}>
          <svg viewBox="0 0 16 15" width="16" height="15">
            <path
              fill="currentColor"
              d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        </div>
        <div className={'double ' + (lastMessage.status === 1 ? 'active' : '')}>
          <svg viewBox="0 0 16 15" width="16" height="15">
            <path
              fill="currentColor"
              d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        </div>
        <div className={'blue ' + (lastMessage.status === 2 ? 'active' : '')}>
          <svg viewBox="0 0 16 15" width="16" height="15">
            <path
              fill="currentColor"
              d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
            ></path>
          </svg>
        </div>
      </div>
    )
  }
  let lastMessageTime
  if (SameDay(lastMessage.time)) {
    lastMessageTime = GetTime(lastMessage.time)
  } else {
    lastMessageTime = GetDayAndMonth(lastMessage.time)
  }

  return (
    <>
      <Link
        to={`/chatscreen/${user.userIndex}`}
        className={'chat-item ' + (selected ? ' selected ' : '')}
        onTouchStart={touchstart}
        onTouchEnd={touchend}
        onTouchMove={touchmove}
        onClick={(e) => {
          handleClick(e)
          OpenFullscreen()
        }}
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
            {tick}
            <div className="content">
              {lastMessage?.content.replaceAll(/\n/g, ' ')}
            </div>
          </div>
        </div>
        <div className="time-container">
          <div className="message-time">{lastMessageTime}</div>
          <div className={'lastseen-time ' + onlineClass}>{seen}</div>
        </div>
      </Link>
    </>
  )
}

export default withRouter(ChatItem)
