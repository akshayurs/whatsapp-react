import React from 'react'
import { useParams } from 'react-router-dom'
function VideoCall() {
  const { userid } = useParams()
  return <h1>video call{userid}</h1>
}

export default VideoCall
