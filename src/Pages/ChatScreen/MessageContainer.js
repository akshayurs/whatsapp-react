import React, { useEffect, useRef, memo, useState, useContext } from 'react'
import Message from '../../components/Message'
import { UserContext } from '../../Helpers/UserContext'
function MessageContainer(props) {
  const appState = useContext(UserContext)
  const { user, setReply, inputEle, handleSelect, clickToSelect } = props
  const [scrollDownEle, setScrollDownEle] = useState(false)
  const messageContainerEle = useRef(null)
  useEffect(() => {
    if (messageContainerEle.current) {
      messageContainerEle.current.scrollTop =
        messageContainerEle.current.scrollHeight
    }
  }, [messageContainerEle, user, appState, setReply])

  return (
    <div
      className="message-container"
      ref={messageContainerEle}
      style={{ background: ' #E5DDD5 url("/img/bg.png")' }}
      onScroll={() => {
        // messageContainerEle.scrollHeight
        if (
          messageContainerEle.current.scrollHeight -
            messageContainerEle.current.scrollTop >
          800
        ) {
          setScrollDownEle(true)
        } else {
          setScrollDownEle(false)
        }
      }}
    >
      {user.chatsList.map((chat) => (
        <Message
          key={chat.index}
          chat={chat}
          user={user}
          setReply={setReply}
          inputEle={inputEle}
          messageContainerEle={messageContainerEle}
          handleSelect={handleSelect}
          clickToSelect={clickToSelect}
        />
      ))}
      {scrollDownEle && (
        <div
          className="scroll-down"
          onClick={() => {
            messageContainerEle.current.scrollTop =
              messageContainerEle.current.scrollHeight
          }}
        >
          <i className="fas fa-2x fa-angle-double-down scroll-down"></i>
        </div>
      )}
    </div>
  )
}

export default memo(MessageContainer)
