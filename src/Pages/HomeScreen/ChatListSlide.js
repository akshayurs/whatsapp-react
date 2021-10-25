import React, { useContext, useRef, useEffect, useCallback } from 'react'
import { UserContext } from '../../Helpers/UserContext'
import ChatItem from '../../components/ChatItem'
import { SortByKeyLast } from '../../Helpers/Sort'

function ChatListSlide(props) {
  const { setHeaderState, clickToSelect, setClickToSelect,selectedMessages } = props
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
  const sortedChats = SortByKeyLast(appState, ['chatsList', 'time'], false)

  return (
    <div className="chats-list slide-item">
      {sortedChats.map((user) => {
        if (user.chatsList.length === 0) {
          return ''
        }
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
