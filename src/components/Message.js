import React, { useEffect, useRef, useState } from 'react'
import ChangeImage from '../Helpers/ChangeImage'
import { GetTime, GetDayAndMonth } from '../Helpers/Time'
function Message(props) {
  const {
    chat,
    user,
    setReply,
    inputEle,
    messageContainerEle,
    handleSelect,
    clickToSelect,
    addContentDate,
  } = props
  const element = useRef(null)
  const toReply = useRef(false)
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

  function handleClick() {
    if (clickToSelect) {
      setSelected((prev) => {
        return !prev
      })
      handleSelect(chat.index)
    }
  }
  function handleMessageSelect() {
    if (toSelect.current) {
      setSelected(true)
      handleSelect(chat.index)
    }
  }
  function touchstart(e) {
    if (clickToSelect) {
      return
    }
    toReply.current = false
    toSelect.current = true
    e.persist()
    startedX.current = e.touches[0].clientX
    startedY.current = e.touches[0].clientY
    timeout.current = setTimeout(handleMessageSelect, 500)
  }

  function touchmove(e, { current: ele }, msgIndex) {
    if (clickToSelect) {
      return
    }
    e.persist()
    e.stopPropagation()
    currentX.current = e.touches[0].clientX
    currentY.current = e.touches[0].clientY

    let moveX = currentX.current - startedX.current
    let moveY = currentY.current - startedY.current
    if ((moveX > 10 || moveY > 10) && toSelect.current) {
      toSelect.current = false
      clearTimeout(timeout.current)
    }
    if (moveX > 0) {
      ele.style.transform = `translateX(${
        ((moveX * startedX.current) / currentX.current) * 1.5
      }px)`
    }
    if (moveX > 260 && moveY < 50 && moveY > -50) {
      touchend(e, { current: ele }, msgIndex)
      toReply.current = false
      return
    }
    if (moveX > 200 && moveY < 50 && moveY > -50) {
      toReply.current = true
    }
  }
  function touchend(e, { current: ele }, msgIndex) {
    clearTimeout(timeout.current)
    ele.style.transform = `translateX(0px)`
    if (clickToSelect) {
      return
    }
    toSelect.current = false
    e.persist()
    if (toReply.current) {
      setReply(() => {
        let type = 1
        if (ele.querySelector('.received')) {
          type = 0
        }
        let content = ele
          .querySelector('.main .content')
          .innerHTML.replaceAll(/<br>/g, '\n')
        let doc = {}
        if (chat.isDocument) {
          doc = {
            isDocument: true,
            src: chat.src,
          }
        }
        inputEle.current.focus()
        return {
          active: true,
          type,
          content,
          index: msgIndex,
          ...doc,
        }
      })
    }
    toReply.current = false
  }
  function gotoMessage(index) {
    const ele = document.querySelector(`[data-message-index="${index}"]`)
    if (!ele) {
      console.log('Message not found')
      return
    }
    messageContainerEle.current.scrollTop = ele.offsetTop - 75
    ele.classList.add('temp-selected')
    setTimeout(() => {
      ele.classList.remove('temp-selected')
    }, 2000)
  }
  let contentDate = ''
  if (addContentDate) {
    contentDate = (
      <div className="content-date">{GetDayAndMonth(chat.time)}</div>
    )
  }
  if (chat.replyFor) {
    console.log(chat)
  }
  return (
    <>
      {contentDate}
      <div
        ref={element}
        onTouchStart={(e) => touchstart(e)}
        onTouchEnd={(e) => touchend(e, element, chat.index)}
        onTouchMove={(e) => touchmove(e, element, chat.index)}
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
        className={
          'message ' +
          (chat.type === 1 ? 'from ' : 'to ') +
          (selected ? ' selected' : '') +
          (chat.isDocument ? ' document ' : '')
        }
        data-message-index={chat.index}
      >
        <i className="fas fa-2x fa-reply reply-logo"></i>
        <div
          className={`${chat.type === 1 ? 'received ' : 'sent '} ${
            chat.isReply ? 'replied' : ''
          }`}
        >
          {chat.isReply ? (
            <div
              onClick={(e) => {
                e.stopPropagation()
                gotoMessage(chat.replyFor.index)
              }}
              className={
                'replay-message-container ' +
                (chat.replyFor.isDocument ? ' document' : '')
              }
            >
              <div className="reply-left">
                <div className="name">
                  {chat.replyFor.type === 0 ? user.name : 'You'}
                </div>
                <div className="content">
                  {chat.replyFor.content.replaceAll(/\n/g, ' ')}
                  {chat.replyFor.isDocument && (
                    <>
                      <span className="fa">&#xf03e;</span> <span>Photo</span>
                    </>
                  )}
                </div>
              </div>
              {chat.replyFor.isDocument && (
                <div className="reply-right">
                  <img src={ChangeImage(chat.replyFor.src)} alt="" />
                </div>
              )}
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
            {chat.isDocument && (
              <img className="image" src={ChangeImage(chat.src)} alt="" />
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

export default Message
