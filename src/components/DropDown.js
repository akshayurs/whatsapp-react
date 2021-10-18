import React from 'react'

function DropDown(props) {
  return (
    <div
      className="dropdown-screen"
      onClick={() => {
        props.setOpenMenu(false)
        props.playStatus && props.playStatus()
      }}
    >
      <div className="dropdown-container">{props.children}</div>
    </div>
  )
}

export default DropDown
