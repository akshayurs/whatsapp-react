import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../UserContext'
import ContactItem from './ContactItem'
function NewChatScreen(props) {
  const appState = useContext(UserContext)
  return (
    <div className="new-chat-screen">
      <header>
        <div className="left">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <div className="container">
            <h2>Select Contact</h2>
            <h3 className="contacts-total">
              <span>2</span> contacts
            </h3>
          </div>
        </div>
        <div className="right">
          <i className="fas fa-2x fa-search"></i>
          <i className="fas fa-2x fa-ellipsis-v"></i>
        </div>
      </header>
      <div className="item new-group">
        <i className="fas fa-2x fa-user-friends user-icon"></i>
        <h2>New Group</h2>
      </div>
      <div className="item new-contact">
        <i className="fas fa-2x fa-user-plus user-icon"></i>
        <h2>New Contact</h2>
        <label htmlFor="camerainput">
          <i className="fas fa-2x fa-qrcode qrcode"></i>
        </label>
      </div>
      <div className="contacts-list-container">
        {appState.map((user) => (
          <ContactItem user={user} key={user.userIndex} />
        ))}
      </div>
    </div>
  )
}

export default withRouter(NewChatScreen)
