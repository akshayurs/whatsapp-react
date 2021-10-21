import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Helpers/UserContext'
import ChatItem from '../../components/ChatItem'

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
