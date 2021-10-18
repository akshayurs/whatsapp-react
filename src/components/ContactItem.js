import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function ContactItem(props) {
  const { user, history } = props
  let img = user.profile
  if (!/^http/.test(img)) {
    img = '/img/' + img
  }
  return (
    <Link to={`/chatscreen/${user.userIndex}`} className="item contact">
      <img
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          history.push(`/contactabout/${user.userIndex}`)
        }}
        src={img}
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
