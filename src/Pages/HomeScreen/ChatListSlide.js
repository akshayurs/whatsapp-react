import React, { useContext } from 'react'
import { UserContext } from '../../Helpers/UserContext'
import ChatItem from '../../components/ChatItem'
import { SortByKeyLast } from '../../Helpers/Sort'

function ChatListSlide() {
  const appState = useContext(UserContext)
  const sortedChats = SortByKeyLast(appState, ['chatsList', 'time'], false)
  return (
    <div className="chats-list slide-item">
      {sortedChats.map((user, index) => {
        if (user.chatsList.length === 0) {
          return ''
        }
        return <ChatItem key={user.userIndex} user={user} />
      })}
    </div>
  )
}

export default ChatListSlide
