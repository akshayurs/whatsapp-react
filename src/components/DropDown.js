import React, { useEffect, useRef } from 'react'

function DropDown(props) {
  const container = useRef(null)
  return (
    <div
      className="dropdown-screen"
      onClick={() => {
        props.setOpenMenu(false)
        props.playStatus && props.playStatus()
      }}
    >
      <div className="dropdown-container" ref={container}>
        {props.children}
      </div>
    </div>
  )
}

export default DropDown
