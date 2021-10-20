import React from 'react'
import {  withRouter } from 'react-router-dom'

function Settings(props) {
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
        <div className="profile">
          <div className="left">
            <img src="/img/user.jpg" alt="" />
            <div className="container">
              <div className="name">Akshay</div>
              <div className="about">Busy</div>
            </div>
          </div>
          <div className="right">
            <i className="fas fa-2x fa-qrcode"></i>
          </div>
        </div>
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
