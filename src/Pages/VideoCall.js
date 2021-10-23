import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { UserContext } from '../Helpers/UserContext'
import ChangeImage from '../Helpers/ChangeImage'
function VideoCall(props) {
  const { userid } = useParams()
  const cameraEle = useRef(null)
  const appState = useContext(UserContext)
  const [error, setError] = useState(false)
  const user = appState.find((user) => {
    return user.userIndex === parseInt(userid)
  })

  function handleBack() {
    props.history.go(-1)
  }
  const startCamerafun = useCallback(() => {
    const video = cameraEle.current
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream
        })
        .catch(function (error) {
          setError('Permission denied')
        })
    } else {
      setError('Browser not supported')
    }
  }, [cameraEle])
  useEffect(() => {
    startCamerafun()
  }, [startCamerafun, cameraEle, error])
  if (!user) {
    return ''
  }
  const src = ChangeImage(user.profile)
  if (error) {
    return (
      <>
        <br></br>
        <h1 style={{ textAlign: 'center' }}>{error}</h1>
        <br></br>
        <h2 style={{ textAlign: 'center' }} onClick={handleBack}>
          Back
        </h2>
      </>
    )
  }
  return (
    <>
      <div className="video-call-screen">
        <div className="video">
          <video autoPlay={true} ref={cameraEle} id="videoElement"></video>
        </div>
        <header>
          <div className="top">
            <i className="fas fa-2x fa-chevron-down" onClick={handleBack}></i>
            <p>
              <i className="fas fa-lock"></i> End-to-end encrypted
            </p>
          </div>
          <div className="mid">
            <img src={src} alt="" />
          </div>
          <div className="bottom">
            <div className="name">{user.name}</div>
            <p>Calling</p>
          </div>
        </header>
        <div className="end-call" onClick={handleBack}>
          <i className="fas fa-2x fa-phone"></i>
        </div>
        <footer>
          <i className="fas fa-2x fa-volume-up"></i>
          <i className="fas fa-2x fa-video-slash"></i>
          <i className="fas fa-2x fa-microphone-slash"></i>
        </footer>
      </div>
      <audio src="/audio/outgoing.mp3" autoPlay={true} loop></audio>
    </>
  )
}

export default withRouter(VideoCall)
