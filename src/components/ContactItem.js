import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
function ContactItem(props) {
  const { user, history } = props
  return (
    <Link to={`/chatscreen/${user.userIndex}`} className="item contact">
      <img
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          history.push(`/contactabout/${user.userIndex}`)
        }}
        src={ChangeImage(user.profile)}
        alt="profile icon"
      />
      <div className="container">
        <div className="name">{user.name}</div>
        <div className="about">{user.about}</div>
      </div>
    </Link>
  )
}

export default withRouter(ContactItem)
