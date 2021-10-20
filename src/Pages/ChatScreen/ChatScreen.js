import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Helpers/UserContext'
import Message from '../../components/Message'
import Header from './Header'
import Footer from './Footer'

function ChatScreen() {
  const { userid } = useParams()
  const inputEle = useRef(null)
  const messageContainerEle = useRef(null)
  const [scrollDownEle, setScrollDownEle] = useState(false)

  const appState = useContext(UserContext)

  const [reply, setReply] = useState({
    active: false,
    name: '',
    content: '',
    type: 0,
    index: 0,
  })
  useEffect(() => {
    if (messageContainerEle.current) {
      messageContainerEle.current.scrollTop =
        messageContainerEle.current.scrollHeight
    }
  }, [appState, reply])
  let user = useCallback(
    appState.find((user) => user.userIndex === parseInt(userid)),
    [appState]
  )
  if (!user) {
    return ''
  }
  return (
    <div className="chatscreen">
      <Header user={user} userid={userid} />
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
      <Footer
        reply={reply}
        setReply={setReply}
        user={user}
        inputEle={inputEle}
      />
    </div>
  )
}

export default ChatScreen
