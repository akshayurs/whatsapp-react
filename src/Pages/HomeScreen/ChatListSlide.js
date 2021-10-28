import React, { useContext, useRef, useEffect, useCallback } from 'react'
import { UserContext } from '../../Helpers/UserContext'
import ChatItem from '../../components/ChatItem'
import { SortByKeyLast } from '../../Helpers/Sort'

function ChatListSlide(props) {
  const { setHeaderState, clickToSelect, setClickToSelect, selectedMessages } =
    props
  const appState = useContext(UserContext)

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
  const sortedChats = SortByKeyLast(
    appState.filter((user) => user.chatsList.length > 0),
    ['chatsList', 'time'],
    false
  )
  if (sortedChats.length === 0) {
    return (
      <div className="chats-list slide-item">
        <div className="empty-homescreen">
          To start messaging contacts who <br /> have whatsapp, tap
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            ></path>
          </svg>
          at the <br />
          <span className="lastline"> bottom of your screen.</span>
        </div>
      </div>
    )
  }
  return (
    <div className="chats-list slide-item">
      {sortedChats.map((user) => {
        return (
          <ChatItem
            key={user.userIndex}
            user={user}
            clickToSelect={clickToSelect}
            handleSelect={handleSelect}
          />
        )
      })}
    </div>
  )
}

export default ChatListSlide
