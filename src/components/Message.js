import React, { useRef } from 'react'

function Message(props) {
  const { chat, user, setReply, inputEle, messageContainerEle } = props
  const element = useRef(null)
  let startedX = 0
  let currentX = 0
  function touchstart(e) {
    e.persist()
    startedX = e.touches[0].clientX
  }
  function touchmove(e, { current: ele }, msgIndex) {
    e.persist()
    e.stopPropagation()
    currentX = e.touches[0].clientX
    let moveX = currentX - startedX

    if (moveX > 0) {
      ele.style.transform = `translateX(${
        ((moveX * startedX) / currentX) * 1.5
      }px)`
    }
    if (moveX > 200) {
      touchend(e, { current: ele })
      //   addReplyToInputBox(ele)
      setReply(() => {
        let type = 1
        if (ele.querySelector('.received')) {
          type = 0
        }
        let content = ele.querySelector('.main .content').innerHTML
        inputEle.current.focus()
        return { active: true, type, content, index: msgIndex }
      })
    }
  }
  function touchend(e, { current: ele }) {
    e.persist()
    ele.style.transform = `translateX(0px)`
  }
  function gotoMessage(index) {
    const ele = document.querySelector(`[data-message-index="${index}"]`)
    messageContainerEle.current.scrollTop = ele.offsetTop - 75
    ele.classList.add('selected')
    console.log(ele.offsetTop)
    setTimeout(() => {
      ele.classList.remove('selected')
    }, 2000)
  }

  if (chat.type === 0) {
    return <div className="content-date">{chat.content}</div>
  }

  if (chat.type === 1) {
    return (
      <div
        ref={element}
        onTouchStart={(e) => touchstart(e)}
        onTouchEnd={(e) => touchend(e, element)}
        onTouchMove={(e) => touchmove(e, element, chat.index)}
        className="message"
        data-message-index={chat.index}
      >
        <i className="fas fa-2x fa-reply reply-logo"></i>
        <div className={`received ${chat.isReply ? 'replied' : ''}`}>
          {chat.isReply ? (
            <div
              className="replay-message-container"
              onClick={() => gotoMessage(chat.replyFor.index)}
            >
              <div className="name">
                {chat.replyFor.type === 0 ? user.name : 'You'}
              </div>
              <div className="content">
                {chat.replyFor.content.replaceAll(/\n/g, '<br>')}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="main">
            <svg viewBox="0 0 8 13" width="8" height="13" className="">
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
            <div className="content">
              {chat.content.replaceAll(/\n/g, '<br>')}
            </div>
            <div className="time">{chat.time}</div>
          </div>
        </div>
      </div>
    )
  }

  if (chat.type === 2) {
    return (
      <div
        ref={element}
        onTouchStart={(e) => touchstart(e)}
        onTouchEnd={(e) => touchend(e, element)}
        onTouchMove={(e) => touchmove(e, element, chat.index)}
        className="message"
        data-message-index={chat.index}
      >
        <i className="fas fa-2x fa-reply reply-logo"></i>
        <div className={`sent ${chat.isReply ? 'replied' : ''}`}>
          {chat.isReply ? (
            <div
              onClick={() => gotoMessage(chat.replyFor.index)}
              className="replay-message-container"
            >
              <div className="name">
                {chat.replyFor.type === 0 ? user.name : 'You'}
              </div>
              <div className="content">
                {chat.replyFor.content.replaceAll(/\n/g, '<br>')}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="main">
            <svg viewBox="0 0 8 13" width="8" height="13" className="">
              <path
                opacity=".13"
                d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
              ></path>
              <path
                fill="#dcf8c6"
                d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
              ></path>
            </svg>
            <div className="content">
              {chat.content.replaceAll(/\n/g, '<br>')}
            </div>
            <div className="time">{chat.time}</div>
            <div className="tick">
              <div className={'single ' + (chat.status === 0 ? 'active' : '')}>
                <svg viewBox="0 0 16 15" width="16" height="15">
                  <path
                    fill="currentColor"
                    d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                  ></path>
                </svg>
              </div>
              <div className={'double ' + (chat.status === 1 ? 'active' : '')}>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Message
