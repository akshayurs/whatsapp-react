import React, { useContext, useState, useRef, useEffect } from 'react'
import { withRouter, useParams, Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { DispatchContext } from '../DispatchContext'
import Message from './Message'
import sentSound from '../sent.mp3'
function ChatScreen(props) {
  const { userid } = useParams()
  const inputEle = useRef(null)
  const messageContainerEle = useRef(null)
  const soundEle = useRef(null)
  let inputEleLen = useRef(0)

  useEffect(() => {
    if (messageContainerEle.current) {
      messageContainerEle.current.scrollTop =
        messageContainerEle.current.scrollHeight
    }
  })

  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const [inputVal, setInputVal] = useState('')
  const [reply, setReply] = useState({
    active: false,
    name: '',
    content: '',
    type: 0,
    index: 0,
  })
  let user = appState.find((user) => user.userIndex === parseInt(userid))
  if (!user) {
    return ''
  }

  let profileimg = user.profile
  if (!/^http/.test(profileimg)) {
    profileimg = '/img/' + profileimg
  }
  function handleInput(e) {
    setInputVal(e.target.value)
    e.target.style.height = `${inputEleLen.current}px`
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  function handleSubmit() {
    soundEle.current.play()
    let obj = {}

    if (reply.active) {
      obj = {
        content: inputVal,
        isReply: true,
        replyFor: {
          type: reply.type,
          content: reply.content,
          index: reply.index,
        },
      }
    } else {
      obj = {
        content: inputVal,
      }
    }
    appDispatch({
      type: 'SEND_MSG',
      value: {
        content: {
          ...obj,
        },
        userIndex: userid,
      },
    })
    appDispatch({ type: 'SAVE_DATA' })
    setInputVal('')
    setReply({ active: false })
    inputEle.current.focus()
  }

  return (
    <div className="chatscreen">
      <div className="header">
        <div className="left">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <Link to={'/contactabout/' + userid}>
            <img alt="profile icon" src={profileimg} />
          </Link>
          <Link to={'/contactabout/' + userid}>
            <div className="container">
              <div className="name">{user.name}</div>
              <div className="lastseen">
                {user.isOnline ? 'online' : user.lastseen}
              </div>
            </div>
          </Link>
        </div>
        <div className="right">
          <i className="fas fa-2x fa-video"></i>
          <i className="fas fa-2x fa-phone-alt"></i>
          <i className="fas fa-2x fa-ellipsis-v"></i>
        </div>
      </div>
      <div
        className="message-container"
        ref={messageContainerEle}
        style={{ background: 'url("/img/background.png")' }}
      >
        {user.chatsList.map((chat) => (
          <Message
            key={chat.index}
            chat={chat}
            user={user}
            setReply={setReply}
            inputEle={inputEle}
            messageContainerEle={messageContainerEle}
          />
        ))}
      </div>
      <footer style={{ background: 'url("/img/background.png")' }}>
        <div className={'left ' + (reply.active ? 'reply--visible' : '')}>
          {reply.active ? (
            <div className="reply-container" data-active="false">
              <div className="name">{reply.type == 0 ? user.name : 'You'}</div>
              <div className="content">{reply.content}</div>
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
          <i className="far fa-2x fa-laugh"></i>
          <textarea
            ref={inputEle}
            value={inputVal}
            onChange={handleInput}
            className="textbox message-box"
            placeholder="Type a message"
          />
          <i className="fas fa-2x fa-paperclip rotate"></i>
          <i className="fas fa-2x fa-camera"></i>
        </div>
        <div className="right">
          <i
            className={
              'fas fa-2x fa-microphone mic ' +
              (inputVal.trim().length === 0 ? 'visible' : '')
            }
          ></i>
          <i
            onClick={handleSubmit}
            className={
              'fas fa-2x fa-paper-plane send ' +
              (inputVal.trim().length > 0 ? 'visible' : '')
            }
          ></i>
        </div>
      </footer>
      <audio src={sentSound} ref={soundEle}></audio>
    </div>
  )
}

export default withRouter(ChatScreen)
