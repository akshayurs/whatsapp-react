import { useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import ChangeImage from '../Helpers/ChangeImage'
import UserItem from '../Components/UserItem'

function EditData(props) {
  const appState = useContext(UserContext)
  const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
  return (
    <div className="editdatascreen">
      <header>
        <div
          onClick={() => {
            props.history.go(-1)
          }}
        >
          <i className="fas fa-2x fa-arrow-left"></i>
        </div>
        <p>App Data</p>
      </header>
      <h1 className="title">Your Data</h1>
      <div className="user-container">
        <img src={ChangeImage(metaData.profile)} alt="" />
        <div className="name">{metaData.name}</div>
        <div className="about">{metaData.about}</div>
        <Link to="/editmetadata/">
          <i className="fas fa-pencil-alt"></i>Edit
        </Link>
      </div>

      <div className="contacts-container">
        <h1 className="title">Contacts</h1>
        {appState.map((user) => (
          <UserItem user={user} key={user.userIndex} />
        ))}
      </div>
      <Link to="/addnewuser/" className="addnewcontact">
        <i className="fas fa-plus"></i>
        New contact
      </Link>
    </div>
  )
}

export default withRouter(EditData)
