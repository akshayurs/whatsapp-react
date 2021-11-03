import { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import ContactItem from '../Components/ContactItem'
import { SortByKey } from '../Helpers/Sort'
function NewChatScreen(props) {
  const appState = useContext(UserContext)
  const sortedList = SortByKey(appState, ['name'], true)
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
              <span>{appState.length}</span> contacts
            </h3>
          </div>
        </div>
        <div className="right">
          <Link to="/search">
            <i className="fas fa-2x fa-search"></i>
          </Link>
          <i className="fas fa-2x fa-ellipsis-v"></i>
        </div>
      </header>
      <div className="item new-group">
        <i className="fas fa-2x fa-user-friends user-icon"></i>
        <h2>New Group</h2>
      </div>
      <Link to="/addnewuser/" className="item new-contact">
        <i className="fas fa-2x fa-user-plus user-icon"></i>
        <h2>New Contact</h2>
        <label htmlFor="camerainput">
          <i className="fas fa-2x fa-qrcode qrcode"></i>
        </label>
      </Link>
      <div className="contacts-list-container">
        {sortedList.map((user) => (
          <ContactItem user={user} key={user.userIndex} />
        ))}
      </div>
    </div>
  )
}

export default withRouter(NewChatScreen)
