import React, { useContext, useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router'
import ChangeImage from '../Helpers/ChangeImage'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { resizeFile } from '../Helpers/imageResize'
import { DispatchContext } from '../Helpers/DispatchContext'
function EditUser(props) {
  const { userid } = useParams()
  const { addNewContact, isyourData } = props
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)

  const [uploadType, setUploadType] = useState({ type: 0 })
  const [isOnline, setIsOnline] = useState(true)
  const [lastSeenTime, setLastSeenTime] = useState(0)
  const [name, setName] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [about, setAbout] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profile, setProfile] = useState('default.jpg')
  const [aboutUpdatedTime, setAboutUpdatedTime] = useState(0)

  useEffect(() => {
    const userIndex = GetUserIndex(appState, parseInt(userid))
    const user = appState[userIndex]
    if (addNewContact) {
      setUploadType({ type: 1 })
    }
    if (user && !addNewContact && !isyourData) {
      setOriginalName(user.name)
      setName(user.name)
      setProfile(user.profile)
      setAbout(user.about)
      setAboutUpdatedTime(() => {
        let date = new Date(user.aboutUpdatedTime)
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return date.toISOString().slice(0, 10)
      })
      setIsOnline(user.isOnline)
      setPhoneNumber(user.phoneNumber)
      if (!user.isOnline) {
        let date = new Date(user.lastSeen)
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        setLastSeenTime(date.toISOString().slice(0, 16))
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
  }, [appState])

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
            return
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
              lastSeen: new Date(lastSeenTime).getTime(),
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
                userIndex: parseInt(userid),
              },
            })
          }
          props.history.go(-1)
        }}
      >
        <img src={ChangeImage(profile)} alt="profile picture" />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          maxLength="20"
        />
        <div className="image-upload-container">
          <label htmlFor="localstorage">Upload Image from Storage</label>
          <input
            type="radio"
            name="upload"
            id="localstorage"
            required
            checked={uploadType.type === 0}
            onChange={() => {
              setUploadType({ type: 0 })
              setProfile('')
            }}
          />
          <label htmlFor="fromurl">Upload Image from URL</label>
          <input
            type="radio"
            name="upload"
            id="fromurl"
            required
            checked={uploadType.type === 1}
            onChange={() => {
              setUploadType({ type: 1 })
              setProfile('')
            }}
          />
        </div>
        {uploadType.type === 0 ? (
          <input
            type="file"
            onChange={async (e) => {
              try {
                const image = await resizeFile(e.target.files[0], 200, 200)
                console.log(image)
                setProfile(image)
              } catch (err) {
                alert(err)
                e.target.value = ''
              }
            }}
          />
        ) : (
          <>
            <label htmlFor="profile">Profile picture URL:</label>
            <input
              type="text"
              id="profile"
              value={profile}
              required
              placeholder="http://example.com/image.jpg"
              onChange={(e) => setProfile(e.target.value)}
            />
          </>
        )}

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
                  <input
                    type="datetime-local"
                    id="lastseentime"
                    value={lastSeenTime}
                    placeholder="Time"
                    onChange={(e) => {
                      setLastSeenTime(e.target.value)
                    }}
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
          {!addNewContact && !isyourData && (
            <button
              className="delete"
              onClick={() => {
                if (window.confirm('Do you want to delete ' + originalName)) {
                  appDispatch({ type: 'DELETE_USER', value: parseInt(userid) })
                  props.history.go(-1)
                }
              }}
            >
              Delete
            </button>
          )}

          <button type="submit" className="save">
            {addNewContact ? 'Create' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditUser)
