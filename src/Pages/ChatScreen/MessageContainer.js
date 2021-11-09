import { useEffect, memo, useContext, useRef } from 'react'
import Message from '../../Components/Message'
import { UserContext } from '../../Helpers/UserContext'
import { SameDay } from '../../Helpers/Time'

function MessageContainer(props) {
  const appState = useContext(UserContext)
  let prevChat = useRef(null)
  const {
    user,
    setReply,
    inputEle,
    handleSelect,
    clickToSelect,
    setScrollDownEle,
    messageContainerEle,
  } = props
  useEffect(() => {
    setTimeout(() => {
      if (messageContainerEle.current) {
        messageContainerEle.current.scrollTop =
          messageContainerEle.current.scrollHeight
      }
    }, 10)
  }, [messageContainerEle, user, appState, setReply])
  return (
    <div
      className="message-container"
      ref={messageContainerEle}
      style={{ background: ' #E5DDD5 url("/media/bg.png")' }}
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
      {user.chatsList.map((chat, index) => {
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
            addContentDate={addContentDate}
            key={chat.index}
            chat={chat}
            user={user}
            setReply={setReply}
            inputEle={inputEle}
            messageContainerEle={messageContainerEle}
            handleSelect={handleSelect}
            clickToSelect={clickToSelect}
          />
        )
      })}
    </div>
  )
}

export default memo(MessageContainer)
