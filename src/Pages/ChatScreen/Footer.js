import React, { useRef, useContext, useState, memo } from 'react'
import { DispatchContext } from '../../Helpers/DispatchContext'

function Footer(props) {
  const { reply, setReply, user, inputEle } = props
  const soundEle = useRef(null)
  const appDispatch = useContext(DispatchContext)
  const [inputVal, setInputVal] = useState('')
  let inputEleLen = useRef(0)

  function handleInput(e) {
    e.persist()
    setInputVal(e.target.value)
    e.target.style.height = `${inputEleLen.current}px`
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  function handleSubmit() {
    if (!inputVal.trim()) {
      return
    }
    soundEle.current.play()
    let obj = {}

    if (reply.active) {
      obj = {
        content: inputVal.trim(),
        isReply: true,
        replyFor: {
          type: reply.type,
          content: reply.content,
          index: reply.index,
        },
      }
    } else {
      obj = {
        content: inputVal.trim(),
      }
    }
    appDispatch({
      type: 'SEND_MSG',
      value: {
        content: {
          ...obj,
        },
        userIndex: user.userIndex,
      },
    })
    appDispatch({ type: 'SAVE_DATA' })
    setInputVal('')
    setReply({ active: false })
    inputEle.current.focus()
    setTimeout(() => {
      inputEle.current.style.height = `${inputEleLen.current}px`
      inputEle.current.style.height = `${inputEle.current.scrollHeight}px`
    }, 10)
  }
  return (
    <footer style={{ background: ' #E5DDD5 url("/img/bg.png")' }}>
      <div className={'left ' + (reply.active ? 'reply--visible' : '')}>
        {reply.active ? (
          <div className="reply-container" data-active="false">
            <div className="name">{reply.type === 0 ? user.name : 'You'}</div>
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
        <i className="far fa-2x fa-laugh"></i>
        <textarea
          ref={inputEle}
          value={inputVal}
          onChange={handleInput}
          onKeyPress={(e) => {
            e.persist()
            if (e.key === '\n' && e.ctrlKey) {
              handleSubmit()
            }
          }}
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
      <audio src="/audio/sent.mp3" ref={soundEle}></audio>
    </footer>
  )
}

export default memo(Footer)
