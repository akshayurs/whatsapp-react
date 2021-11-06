import { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
function CameraSlide(props) {
  const cameraEle = useRef(null)
  const [error, setError] = useState(false)
  const [cameraStarted, setCameraStarted] = useState(false)
  function startCamerafun() {
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
  }
  useEffect(() => {
    if (!cameraStarted && props.startCamera) {
      startCamerafun()
      setCameraStarted(true)
    }
  }, [cameraStarted, props.startCamera, setCameraStarted])
  return (
    <div
      className="slide-item camera-screen"
      onMouseUp={() => {
        props.history.push('/editstatus/')
      }}
    >
      {error === false ? (
        <div className="video">
          <video autoPlay={true} ref={cameraEle} id="videoElement"></video>
        </div>
      ) : (
        <div className="error">
          {error}
          <br />
          <Link to="/editstatus/">Click here to edit status</Link>
        </div>
      )}
    </div>
  )
}

export default withRouter(CameraSlide)
