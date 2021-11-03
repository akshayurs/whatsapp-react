import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DispatchContext } from '../Helpers/DispatchContext'
import ChangeImage from '../Helpers/ChangeImage'

function UserItem(props) {
  const appDispatch = useContext(DispatchContext)

  const { user } = props
  return (
    <>
      <div className="user-item" key={user.userIndex}>
        <div className="left">
          <img src={ChangeImage(user.profile)} alt="" />
          <div className="name">{user.name}</div>
        </div>
        <div className="right">
          <Link to={`/edituser/${user.userIndex}`}>
            <i className="fas fa-address-book"></i> Edit Contact
          </Link>
          <Link to={`/editchats/${user.userIndex}`}>
            <i className="fas fa-comment-alt"></i> Edit Chats
          </Link>
          <Link to={`/editcalls/${user.userIndex}`}>
            <i className="fas fa-phone-alt"></i>Edit Calls
          </Link>
          <Link to={`/editstatus/${user.userIndex}`}>
            <i className="fas fa-photo-video"></i>Edit Status
          </Link>
          <div
            onClick={() => {
              if (window.confirm('Do you want to delete ' + user.name)) {
                appDispatch({ type: 'DELETE_USER', value: user.userIndex })
              }
            }}
          >
            <i className="fas fa-trash"></i>Delete Contact
          </div>
        </div>
      </div>
    </>
  )
}

export default UserItem
