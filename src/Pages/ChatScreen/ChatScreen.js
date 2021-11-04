import { useContext, useState, useRef, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Helpers/UserContext'
import Header from './Header'
import Footer from './Footer'
import MessageContainer from './MessageContainer'

function ChatScreen() {
  const { userid, statusIndex } = useParams()
  const inputEle = useRef(null)
  const messageContainerEle = useRef(null)
  const selectedMessages = useRef(new Set())
  const [clickToSelect, setClickToSelect] = useState(false)
  const appState = useContext(UserContext)
  const [scrollDownEle, setScrollDownEle] = useState(false)
  const [headerState, setHeaderState] = useState({
    type: 0,
  })
  const [reply, setReply] = useState({
    active: false,
    name: '',
    content: '',
    type: 0,
    index: 0,
  })
  const user = appState.find((user) => user.userIndex === parseInt(userid))

  useEffect(() => {
    if (statusIndex && user) {
      setReply({
        active: true,
        name: user.name,
        content: `<i class="fas fa-image"></i> Status`,
        src: user.status[statusIndex].src,
        isDocument: { type: 'image' },
        index: -1,
        type: 0,
      })
    }
  }, [])
  useEffect(() => {
    if (!clickToSelect) {
      setHeaderState({ type: 0 })
      selectedMessages.current.clear()
    }
  }, [clickToSelect])

  const handleSelect = useCallback(
    (id) => {
      if (selectedMessages.current.has(id)) {
        selectedMessages.current.delete(id)
      } else {
        selectedMessages.current.add(id)
      }
      if (selectedMessages.current.size === 0) {
        setClickToSelect(false)
        setHeaderState({
          type: 0,
        })
      } else {
        setClickToSelect(true)
        setHeaderState({
          type: 1,
          count: selectedMessages.current.size,
        })
      }
    },
    [selectedMessages, setClickToSelect]
  )
  if (!user) {
    return ''
  }
  return (
    <div className="chatscreen">
      <Header
        user={user}
        userid={userid}
        headerState={headerState}
        setClickToSelect={setClickToSelect}
        selectedMessages={selectedMessages.current}
      />

      <MessageContainer
        user={user}
        setReply={setReply}
        inputEle={inputEle}
        handleSelect={handleSelect}
        clickToSelect={clickToSelect}
        setScrollDownEle={setScrollDownEle}
        messageContainerEle={messageContainerEle}
      />
      <Footer
        reply={reply}
        setReply={setReply}
        user={user}
        inputEle={inputEle}
      />
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

export default ChatScreen
