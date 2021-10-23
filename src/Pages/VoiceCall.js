import React, { useContext } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import ChangeImage from '../Helpers/ChangeImage'
function VoiceCall(props) {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const user = appState.find((user) => {
    return user.userIndex === parseInt(userid)
  })
  if (!user) {
    return ''
  }
  function handleBack() {
    props.history.go(-1)
  }
  const src = ChangeImage(user.profile)
  return (
    <>
      <div className="voice-call-screen">
        <header>
          <div className="top">
            <i className="fas fa-2x fa-chevron-down" onClick={handleBack}></i>
            <p>
              <i className="fas fa-lock"></i> End-to-end encrypted
            </p>
          </div>
          <div className="bottom">
            <div className="name">{user.name}</div>
            <p>Calling</p>
          </div>
        </header>
        <div className="image">
          <img src={src} alt="" />
          <div className="end-call" onClick={handleBack}>
            <i className="fas fa-2x fa-phone"></i>
          </div>
        </div>
        <footer>
          <i className="fas fa-2x fa-volume-up"></i>
          <i className="fas fa-2x fa-video"></i>
          <i className="fas fa-2x fa-microphone-slash"></i>
        </footer>
      </div>
      <audio src="/audio/outgoing.mp3" autoPlay={true} loop></audio>
    </>
  )
}

export default withRouter(VoiceCall)
