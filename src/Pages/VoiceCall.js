import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import ChangeImage from '../Helpers/ChangeImage'
function VoiceCall() {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const user = appState.find((user) => {
    return user.userIndex === parseInt(userid)
  })
  if (!user) {
    return ''
  }
  const src = ChangeImage(user.profile)
  return (
    <>
      <div className="voice-call-screen">
        <header>
          <div className="top">
            <i class="fas fa-2x fa-chevron-down"></i>
            <p>
              <i class="fas fa-lock"></i> End-to-end encrypted
            </p>
          </div>
          <div className="bottom">
            <div className="name">{user.name}</div>
            <p>Calling</p>
          </div>
        </header>
        <div className="image">
          <img src={src} alt="" />
          <div className="end-call">
            <i class="fas fa-2x fa-phone"></i>
          </div>
        </div>
        <footer>
          <i class="fas fa-2x fa-volume-up"></i>
          <i class="fas fa-2x fa-video"></i>
          <i class="fas fa-2x fa-microphone-slash"></i>
        </footer>
      </div>
    </>
  )
}

export default VoiceCall
