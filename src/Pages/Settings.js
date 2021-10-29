import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'

function Settings(props) {
  const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))

  return (
    <>
      <div className="settings">
        <div className="header">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <h1>Settings</h1>
        </div>
        <Link to="/editdata" className="profile">
          <div className="left">
            <img src={ChangeImage(metaData.profile)} alt="" />
            <div className="container">
              <div className="name">{metaData.name}</div>
              <div className="about">{metaData.about}</div>
            </div>
          </div>
          <div className="right">
            <i className="fas fa-2x fa-qrcode"></i>
          </div>
        </Link>
        <div className="item">
          <i className="fas fa-2x fa-key"></i>
          <div className="container">
            <div className="title">Account</div>
            <div className="content">Privacy, Security, Change Number</div>
          </div>
        </div>
        <div className="item">
          <i className="fas fa-2x fa-comment-alt"></i>
          <div className="container">
            <div className="title">Chats</div>
            <div className="content">Theme, Wallpapers, Chat history</div>
          </div>
        </div>
        <div className="item">
          <i className="fas fa-2x fa-bell"></i>
          <div className="container">
            <div className="title">Notifications</div>
            <div className="content">Message, groups & call tones</div>
          </div>
        </div>
        <div className="item">
          <i className="fas fa-2x fa-chart-pie"></i>
          <div className="container">
            <div className="title">Storage and Data</div>
            <div className="content">Network usage,auto-download</div>
          </div>
        </div>
        <div className="item">
          <i className="far fa-2x fa-question-circle"></i>
          <div className="container">
            <div className="title">Help</div>
            <div className="content">
              Help centre, Contact us, Privacy policy
            </div>
          </div>
        </div>
        <div className="item">
          <i className="fas fa-2x fa-user-friends"></i>
          <div className="container">
            <div className="title">Invite a friend</div>
          </div>
        </div>
        <div className="from">
          <h2>from</h2>
          <h1>Akshay</h1>
        </div>
      </div>
    </>
  )
}

export default withRouter(Settings)
