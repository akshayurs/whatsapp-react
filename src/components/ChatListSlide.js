import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import ChatItem from './ChatItem'

function ChatListSlide() {
  const appState = useContext(UserContext)
  return (
    <div className="chats-list slide-item">
      {appState.map((user, index) => {
        if (user.chatsList.length === 0) {
          return ''
        }
        return <ChatItem key={index} user={user} />
      })}
    </div>
  )
}

export default ChatListSlide
