import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams, withRouter } from 'react-router'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import { GetTime, SameDay, GetDayAndMonth } from '../Helpers/Time'
import { SortByKey } from '../Helpers/Sort'
import FlashMsg from '../components/flashMsg'

const insertItem = (arr, item, position) => {
  return [...arr.slice(0, position), item, ...arr.slice(position)]
}

function EditChats(props) {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const prevChat = useRef(null)
  const inputEle = useRef(null)
  const messageContainerEle = useRef(null)
  const [chats, setChats] = useState([])
  const [user, setUser] = useState({})
  const [inputMsg, setInputMsg] = useState('')
  const [reply, setReply] = useState({
    active: false,
  })
  const [time, setTime] = useState(Date.now())
  const [tick, setTick] = useState({ single: true, double: false, blue: false })
  const [position, setPosition] = useState(0)
  const [flashMsg, setFlashMsg] = useState('')
  const flashTimeout = useRef(null)
  let flashEle = ''
  if (flashMsg !== '') {
    flashEle = <FlashMsg message={flashMsg} />
  }
  useEffect(() => {
    return () => {
      clearTimeout(flashTimeout.current)
      setFlashMsg('')
    }
  }, [])
  function clearflash() {
    clearTimeout(flashTimeout.current)
    flashTimeout.current = setTimeout(() => {
      setFlashMsg('')
    }, 2100)
  }
  function handleChange(index, key, value, invert) {
    setChats((prev) => {
      return prev.map((calls) => {
        if (calls.index === index) {
          if (invert) {
            return {
              ...calls,
              [key]: !calls[key],
            }
          }
          return {
            ...calls,
            [key]: value,
          }
        }
        return calls
      })
    })
  }
  useEffect(() => {
    if (appState.length !== 0) {
      const index = GetUserIndex(appState, parseInt(userid))
      setUser(appState[index])
      setChats(appState[index].chatsList)
      setPosition(appState[index].chatsList.length + 1)
    }
  }, [appState, userid])
  useEffect(() => {
    setTimeout(() => {
      messageContainerEle.current.scrollTop =
        messageContainerEle.current.scrollHeight
    }, 50)
  }, [chats, messageContainerEle])
  useEffect(() => {
    inputEle.current.focus()
  }, [position])
  function sendMsg(isOutgoing) {
    if (inputMsg.trim() === '') {
      return
    }
    let chat = {
      index: user.messageIndex + 1,
      type: isOutgoing ? 2 : 1,
      content: inputMsg.trim(),
      time,
    }
    if (isOutgoing) {
      let status = 0
      if (tick.double) {
        status = 1
      }
      if (tick.blue) {
        status = 2
      }
      chat = { ...chat, status }
    }
    if (reply.active) {
      chat = {
        ...chat,
        isReply: true,
        replyFor: reply,
      }
    }
    setInputMsg('')
    setChats((prev) => {
      return insertItem(prev, chat, position - 1)
    })
    setPosition((prev) => prev + 1)
    setReply({ active: false })
    setUser((prev) => {
      return {
        ...prev,
        messageIndex: prev.messageIndex + 1,
      }
    })
  }
  function handleInput(e) {
    e.persist()
    setInputMsg(e.target.value)
    e.target.style.height = `0px`
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const date = new Date(time)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return (
    <div className="editchatsscreen">
      {flashEle}
      <header>
        <div className="top">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <p>Edit Chats - {user.name}</p>
        </div>
        {JSON.stringify(user.chatsList) !== JSON.stringify(chats) && (
          <div className="bottom">
            <button
              onClick={() => {
                appDispatch({
                  type: 'UPDATE_CHATS',
                  value: { userid, chats, messageIndex: user.messageIndex },
                })
              }}
            >
              <i class="fas fa-save"></i>
              Save Changes
            </button>
          </div>
        )}
      </header>
      <div
        className="message-container"
        ref={messageContainerEle}
        style={{ background: ' #E5DDD5 url("/img/bg.png")' }}
      >
        <div className="count">Chat Count - {chats.length}</div>
        {chats.map((chat, index) => {
          return (
            <Message
              key={chat.index}
              chat={chat}
              user={user}
              index={index}
              setChats={setChats}
              setReply={setReply}
              prevChat={prevChat}
              position={position}
              setPosition={setPosition}
            />
          )
        })}
        <div
          className={
            'addnewchat ' + (position === chats.length + 1 ? ' selected' : '')
          }
        >
          <i
            className="fas fa-plus"
            onClick={(e) => {
              setPosition(chats.length + 1)
            }}
          ></i>
        </div>
      </div>
      <footer>
        <div className="position">Message to position - {position}</div>
        {reply.active ? (
          <div className="reply-container" data-active="false">
            <div className="content">
              {reply.content.replaceAll(/\n/g, ' ')}
            </div>
            <i
              onClick={() => {
                setReply({ active: false })
              }}
              className="fas fa-times cancel"
            ></i>
          </div>
        ) : (
          ''
        )}
        <div className="date-container">
          <label htmlFor="time">Time : </label>
          <input
            type="datetime-local"
            id="time"
            value={date.toISOString().slice(0, 16)}
            onChange={(e) => {
              setTime(new Date(e.target.value).getTime())
            }}
            required
          />
        </div>
        <div className="tick-container">
          <input
            type="radio"
            name="tick"
            id="single-tick"
            checked={tick.single}
            onChange={() => {
              setTick({ single: true, double: false, blue: false })
            }}
            required
          />
          <label htmlFor="single-tick">
            <svg viewBox="0 0 16 15" width="16" height="15">
              <path
                fill="currentColor"
                d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
              ></path>
            </svg>
          </label>
          <input
            type="radio"
            name="tick"
            id="double-tick"
            checked={tick.double}
            onChange={() => {
              setTick({ single: false, double: true, blue: false })
            }}
            required
          />
          <label htmlFor="double-tick">
            <svg viewBox="0 0 16 15" width="16" height="15">
              <path
                fill="currentColor"
                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
              ></path>
            </svg>
          </label>
          <input
            type="radio"
            name="tick"
            id="blue-tick"
            checked={tick.blue}
            onChange={() => {
              setTick({ single: false, double: false, blue: true })
            }}
            required
          />
          <label htmlFor="blue-tick">
            <svg viewBox="0 0 16 15" width="16" height="15" className="blue">
              <path
                fill="currentColor"
                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
              ></path>
            </svg>
          </label>
        </div>
        <div className="chat-input-container">
          <i
            className="fas fa-share left"
            onClick={() => {
              sendMsg(false)
            }}
          ></i>
          <textarea
            ref={inputEle}
            value={inputMsg}
            onChange={handleInput}
            className="textbox message-box"
            placeholder="Type a message"
          />
          <i
            className="fas fa-share right"
            onClick={() => {
              sendMsg(true)
            }}
          ></i>
        </div>
      </footer>
    </div>
  )
}

function Message(props) {
  const {
    index,
    user,
    chat,
    setChats,
    setReply,
    prevChat,
    setPosition,
    position,
  } = props
  let addContentDate = false
  if (index === 0) {
    addContentDate = true
  } else {
    if (!SameDay(prevChat.current?.time, chat.time)) {
      addContentDate = true
    }
  }
  prevChat.current = chat

  return (
    <>
      {addContentDate ? (
        <div className="content-date">{GetDayAndMonth(chat.time)}</div>
      ) : (
        ''
      )}
      <div
        className={'addnewchat ' + (position === index + 1 ? ' selected' : '')}
      >
        <i
          className="fas fa-plus"
          onClick={(e) => {
            setPosition(index + 1)
          }}
        ></i>
      </div>
      <div className="message" data-message-index={chat.index}>
        <div
          className={`${chat.type === 1 ? 'received ' : 'sent '} ${
            chat.isReply ? 'replied' : ''
          }`}
        >
          <i
            className="fas fa-trash delete-icon"
            onClick={() => {
              setChats((prev) => {
                return prev.filter((item) => item.index !== chat.index)
              })
            }}
          ></i>
          <i
            className="fas fa-share reply-icon"
            onClick={() => {
              setReply({
                active: true,
                type: chat.type === 1 ? 0 : 1,
                content: chat.content,
                index: chat.index,
              })
            }}
          ></i>
          {chat.isReply ? (
            <div className="replay-message-container">
              <div className="name">
                {chat.replyFor.type === 0 ? user.name : 'You'}
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: chat.replyFor.content.replaceAll(/\n/g, ' '),
                }}
              ></div>
            </div>
          ) : (
            ''
          )}
          <div className="main">
            {chat.type === 1 ? (
              <svg
                viewBox="0 0 8 13"
                width="8"
                height="13"
                className="triangle"
              >
                <path
                  opacity=".13"
                  fill="#0000000"
                  d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
                ></path>
                <path
                  fill="white"
                  d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 8 13"
                width="8"
                height="13"
                className="triangle"
              >
                <path
                  opacity=".13"
                  d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
                ></path>
                <path
                  fill="#dcf8c6"
                  d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
                ></path>
              </svg>
            )}
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: chat.content.replaceAll(/\n/g, '<br>'),
              }}
            ></div>
            <div className="time">{GetTime(chat.time)}</div>
            {chat.type === 2 ? (
              <div className="tick">
                <div
                  className={'single ' + (chat.status === 0 ? 'active' : '')}
                >
                  <svg viewBox="0 0 16 15" width="16" height="15">
                    <path
                      fill="currentColor"
                      d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                    ></path>
                  </svg>
                </div>
                <div
                  className={'double ' + (chat.status === 1 ? 'active' : '')}
                >
                  <svg viewBox="0 0 16 15" width="16" height="15">
                    <path
                      fill="currentColor"
                      d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                    ></path>
                  </svg>
                </div>
                <div className={'blue ' + (chat.status === 2 ? 'active' : '')}>
                  <svg viewBox="0 0 16 15" width="16" height="15">
                    <path
                      fill="currentColor"
                      d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                    ></path>
                  </svg>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(EditChats)
