import React, { useContext, useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router'
import ChangeImage from '../Helpers/ChangeImage'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
function EditUser(props) {
  const { userid } = useParams()
  const { addNewContact, isyourData } = props
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)

  const userIndex = GetUserIndex(appState, parseInt(userid))
  const user = appState[userIndex]

  const [isOnline, setIsOnline] = useState(true)
  const [lastSeenDate, setLastSeenDate] = useState(0)
  const [lastSeenTime, setLastSeenTime] = useState(0)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profile, setProfile] = useState('default.jpg')
  const [aboutUpdatedTime, setAboutUpdatedTime] = useState(0)

  useEffect(() => {
    if (user && !addNewContact && !isyourData) {
      console.log('set', user.isOnline)
      setName(user.name)
      setProfile(user.profile)
      setAbout(user.about)
      setAboutUpdatedTime(
        new Date(user.aboutUpdatedTime).toISOString().slice(0, 10)
      )
      setIsOnline(user.isOnline)
      setPhoneNumber(user.phoneNumber)
      if (!user.isOnline) {
        setLastSeenDate(new Date(user.lastSeen).toISOString().slice(0, 10))
        setLastSeenTime(new Date(user.lastSeen).toISOString().slice(11, 23))
      }
    }
    if (isyourData) {
      const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
      setName(metaData.name)
      setProfile(metaData.profile)
      setAbout(metaData.about)
      setAboutUpdatedTime(
        new Date(metaData.aboutUpdatedTime).toISOString().slice(0, 10)
      )
    }
  }, [user, isyourData, addNewContact])

  return (
    <div className="edituserscreen">
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <p>
          {addNewContact
            ? 'Add new contact'
            : isyourData
            ? 'Your Data'
            : 'Edit Contact'}
        </p>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isyourData) {
            appDispatch({
              type: 'EDIT_META_DATA',
              value: {
                name,
                about,
                profile,
                aboutUpdatedTime: new Date(aboutUpdatedTime).getTime(),
              },
            })
            props.history.go(-1)
          }
          let userObj = {
            isOnline,
            name,
            about,
            phoneNumber,
            profile,
            aboutUpdatedTime: new Date(aboutUpdatedTime).getTime(),
          }
          if (!isOnline) {
            userObj = {
              ...userObj,
              lastSeen: new Date(`${lastSeenDate} ${lastSeenTime}`).getTime(),
            }
          }
          if (addNewContact) {
            appDispatch({
              type: 'ADD_CONTACT',
              value: {
                user: userObj,
              },
            })
          } else {
            appDispatch({
              type: 'UPDATE_USER_DATA',
              value: {
                user: userObj,
                userIndex,
              },
            })
          }
          props.history.go(-1)
        }}
      >
        <img src={ChangeImage(profile)} alt="profile icon" />
        <label htmlFor="profile">Profile picture URL:</label>
        <input
          type="text"
          id="profile"
          value={profile}
          required
          placeholder="http://example.com/image.jpg"
          onChange={(e) => setProfile(e.target.value)}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          maxLength="20"
        />
        <label htmlFor="about">About:</label>
        <textarea
          type="text"
          id="about"
          value={about}
          maxLength="50"
          onChange={(e) => setAbout(e.target.value)}
          required
        />
        <label htmlFor="aboutupdatedtime"> About updated on:</label>
        <input
          type="date"
          id="aboutupdatedtime"
          value={aboutUpdatedTime}
          onChange={(e) => setAboutUpdatedTime(e.target.value)}
          required
        />

        {!isyourData ? (
          <>
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              type="phone"
              id="phoneNumber"
              value={phoneNumber}
              required
              maxLength="15"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="onlineRadioContainer">
              <label htmlFor="onlineRadio">Online</label>
              <input
                type="radio"
                name="online"
                id="onlineRadio"
                checked={isOnline}
                onChange={() => setIsOnline((prev) => !prev)}
                required
              />
              <label htmlFor="offlineRadio">Offline</label>
              <input
                type="radio"
                name="online"
                id="offlineRadio"
                checked={!isOnline}
                onChange={() => setIsOnline((prev) => !prev)}
                required
              />
            </div>
            {!isOnline && (
              <>
                <fieldset>
                  <legend>Lastseen</legend>
                  <label htmlFor="lastseendate">Date</label>
                  <input
                    type="date"
                    id="lastseendate"
                    value={lastSeenDate}
                    placeholder="Date"
                    onChange={(e) => setLastSeenDate(e.target.value)}
                    required
                  />
                  <label htmlFor="lastseentime">Time</label>

                  <input
                    type="time"
                    id="lastseentime"
                    value={lastSeenTime}
                    placeholder="Time"
                    onChange={(e) => setLastSeenTime(e.target.value)}
                    required
                  />
                </fieldset>
              </>
            )}
          </>
        ) : (
          ''
        )}

        <div className="buttons">
          {!addNewContact && (
            <button
              onClick={() => {
                if (window.confirm('Do you want to delete ' + user.name)) {
                  appDispatch({ type: 'DELETE_USER', value: user.userIndex })
                  props.history.go(-1)
                }
              }}
            >
              Delete
            </button>
          )}

          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditUser)
