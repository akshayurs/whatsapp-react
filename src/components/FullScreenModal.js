import React, { useState, useContext } from 'react'
import { FullScreenContext } from '../FullScreenContext'
function FullScreenModal() {
  const openFullScreen = useContext(FullScreenContext)
  let [visible, serVisible] = useState(true)
  return (
    <div className={'fullscreen-modal ' + (visible ? 'visible' : '')}>
      <div className="content">
        <h1>Whatsapp Clone</h1>
        <button
          onClick={() => {
            openFullScreen()
            serVisible(false)
          }}
          className="fullscreen-modal-next"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default FullScreenModal
