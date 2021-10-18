import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { withRouter, useParams, Link } from 'react-router-dom'
function ContactAboutScreen(props) {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const user = appState.find((user) => user.userIndex === parseInt(userid))
  if (!user) {
    return ''
  }
  let img = user.profile
  if (!/^http/.test(img)) {
    img = '/img/' + img
  }
  return (
    <div className="contactscreen">
      <div className="header">
        <div className="top">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <i className="fas fa-2x fa-ellipsis-v"></i>
        </div>
        <div className="image">
          <img src={img} alt="" />
          <div className="name">{user.name}</div>
        </div>
      </div>
      <div className="container">
        <div className="item">
          <h2>Mute notifications</h2>
          <i className="fas fa-2x fa-toggle-off"></i>
        </div>
        <div className="item">
          <h2>Custom notifications</h2>
        </div>
        <div className="item">
          <h2>Media Visibility</h2>
        </div>
      </div>
      <div className="container">
        <div className="item">
          <div className="content">
            <h2>Disappearing messages</h2>
            <h3>Off</h3>
          </div>
          <img src="/img/clock.png" alt="" />
        </div>
        <div className="item">
          <div className="content">
            <h2>Encryption</h2>
            <h3>Message and calls are end-to-end encrypted</h3>
          </div>
          <i className="fas fa-2x fa-lock"></i>
        </div>
      </div>
      <div className="container">
        <div className="title">About and phone number</div>
        <div className="item">
          <div className="content">
            <h2 className="about">{user.about}</h2>
            <h3 className="time">{user.aboutUpdatedTime}</h3>
          </div>
        </div>
        <div className="item">
          <Link to={'/chatscreen/' + userid}>
            <div className="content">
              <h2 className="number">{user.phoneNumber}</h2>
              <h3>Mobile</h3>
            </div>
          </Link>
          <Link to={'/chatscreen/' + userid}>
            <div className="icons">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="message"
              >
                <path
                  fill="currentColor"
                  d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                ></path>
              </svg>
              <i className="fas fa-2x fa-phone-alt"></i>
              <i className="fas fa-2x fa-video"></i>
            </div>
          </Link>
        </div>
      </div>
      <div className="container report">
        <div className="item">
          <i className="fas fa-2x fa-ban"></i>
          <h2>Block</h2>
        </div>
      </div>
      <div className="container report">
        <div className="item">
          <div className="flip">
            <i className="fas fa-2x fa-thumbs-down"></i>
          </div>
          <h2>Report contact</h2>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ContactAboutScreen)
