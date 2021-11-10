import { useContext, useEffect, useState, useRef } from 'react'
import { useParams, withRouter } from 'react-router'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import OpenFullScreen from '../Helpers/OpenFullScreen'
import { SameDay } from '../Helpers/Time'
import FlashMsg from '../Components/flashMsg'
import ChangeImage from '../Helpers/ChangeImage'
import Message from '../Components/Message'
import { resizeFile } from '../Helpers/imageResize'
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
  const [media, setMedia] = useState({ active: false })
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
  useEffect(() => {
    if (appState.length !== 0) {
      const index = GetUserIndex(appState, parseInt(userid))
      setUser(appState[index])
      setChats(appState[index].chatsList)
      setPosition(appState[index].chatsList.length + 1)
    }
    OpenFullScreen()
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
    if (!media.active && inputMsg.trim() === '') {
      return
    }
    inputEle.current.disabled = false
    let chat = {
      index: user.messageIndex + 1,
      type: isOutgoing ? 2 : 1,
      content: inputMsg.trim(),
      time,
    }
    if (media.active) {
      if (media.type === 'audio') {
        chat = {
          ...chat,
          isDocument: { type: 'audio' },
          showContent: false,
          content: '<i className="fas fa-microphone mic "></i> audio',
        }
      }
      if (media.type === 'image') {
        chat = {
          ...chat,
          isDocument: { type: 'image' },
          showContent: false,
          content: '<i className="fas fa-image"></i> Photo',
        }
      }
      chat = { ...chat, src: media.src }
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
    setMedia({ active: false })
    setInputMsg('')
    inputEle.current.focus()
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
    setFlashMsg('Message added')
    clearflash()
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
              if (JSON.stringify(user.chatsList) !== JSON.stringify(chats)) {
                if (window.confirm('Discard changes ?')) {
                  props.history.go(-1)
                }
              } else {
                props.history.go(-1)
              }
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
              <i className="fas fa-save"></i>
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
        {chats.map((chat, index) => {
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
              toEdit={true}
              addContentDate={addContentDate}
            />
          )
        })}
        <div
          className={
            'addnewchat ' + (position === chats.length + 1 ? ' selected' : '')
          }
          onClick={(e) => {
            setPosition(chats.length + 1)
          }}
        >
          {chats.length + 1}) Add Message here
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <footer>
        <div className="position">Adding message to position - {position}</div>
        {reply.active ? (
          <div
            className={
              'reply-container' + (reply.isDocument ? ' document ' : '')
            }
            data-active="false"
          >
            <div className="reply-left">
              <div className="name">{reply.type === 0 ? user.name : 'You'}</div>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: reply.content.replaceAll(/\n/g, ' '),
                }}
              ></div>

              <i
                onClick={() => {
                  setReply({ active: false })
                }}
                className="fas fa-times cancel"
              ></i>
            </div>
            {reply.isDocument?.type === 'image' && (
              <div className="reply-right">
                <img src={ChangeImage(reply.src)} alt="" />
              </div>
            )}
          </div>
        ) : (
          ''
        )}
        <div className="container">
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
          <div className="media-input-container">
            <p>Send: </p>
            <label htmlFor="audio-input">
              <i className="fas fa-2x fa-microphone mic "></i>
            </label>
            <label htmlFor="camera-input">
              <i className="fas fa-2x fa-camera"></i>
            </label>
          </div>
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
        <input
          type="file"
          accept="audio/*"
          id="audio-input"
          onChange={(e) => {
            const reader = new FileReader()
            reader.onload = function () {
              var str = this.result
              setMedia({ active: true, src: str, type: 'audio' })
              setInputMsg('Audio file selected')
              setFlashMsg('Audio selected')
              clearflash()
              inputEle.current.disabled = true
            }
            reader.readAsDataURL(e.target.files[0])
            e.target.value = ''
          }}
        />
        <input
          type="file"
          id="camera-input"
          accept="image/*"
          onChange={async (e) => {
            try {
              const image = await resizeFile(e.target.files[0], 600, 800)
              setMedia({ active: true, src: image, type: 'image' })
              setInputMsg('Image selected')
              setFlashMsg('image selected')
              clearflash()
              inputEle.current.disabled = true
              e.target.value = ''
            } catch (err) {
              alert(err)
              e.target.value = ''
            }
          }}
        />
      </footer>
    </div>
  )
}

export default withRouter(EditChats)
