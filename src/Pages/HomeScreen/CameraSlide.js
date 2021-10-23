import React, { useEffect, useRef, useState } from 'react'

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
    <div className="slide-item camera-screen">
      {error === false ? (
        <div className="video">
          <video autoPlay={true} ref={cameraEle} id="videoElement"></video>
        </div>
      ) : (
        <div className="error">
          {error}
          <br />
          Click here to open camera
          <input type="file" id="camerainput" accept="image/*;capture=camera" />
        </div>
      )}
    </div>
  )
}

export default CameraSlide
