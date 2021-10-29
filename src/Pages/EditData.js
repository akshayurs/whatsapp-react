import React, { useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import ChangeImage from '../Helpers/ChangeImage'
import UserItem from '../components/UserItem'

function EditData(props) {
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
  return (
    <div className="editdatascreen">
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <p>App Data</p>
      </header>
      <div className="user-container"></div>
      <Link to="/addnewuser/" className="addnewcontact">
        <i className="fas fa-plus"></i>
        New contact
      </Link>
      <div className="contacts-container">
        {appState.map((user) => (
          <>
            <UserItem user={user} key={user.userIndex} />
          </>
        ))}
      </div>
    </div>
  )
}

export default withRouter(EditData)
