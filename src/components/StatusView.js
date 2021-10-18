import React, { useContext, useEffect, useState, useRef } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom'
import ProgressBars from './ProgressBars'
import { UserContext } from '../UserContext'
import { DispatchContext } from '../DispatchContext'
import DropDown from './DropDown'
import spinner from '../Spinner.svg'

const animationDuration = 5000
function StatusView() {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)

  const user = appState.find((user) => user.userIndex === parseInt(userid))
  const [statusIndex, setStatusIndex] = useState(0)
  const [status, setStatus] = useState({})
  const [openMenu, setOpenMenu] = useState(false)
  const timeout = useRef(null)
  const holdTimeout = useRef(null)
  const holdStartTime = useRef(null)
  const holded = useRef(null)
  const animationStartedTime = useRef(null)
  const viewEle = useRef(null)
  const [loading, setLoading] = useState(true)
  function nextStatus() {
    setStatusIndex((prev) => prev + 1)
  }
  useEffect(() => {
    setStatus(user?.status[statusIndex])
    if (viewEle.current) {
      viewEle.current.classList.add('hold')
    }
    setLoading(true)
    if (user?.status?.length - 1 === statusIndex && !user.statusViewed) {
      appDispatch({ type: 'STATUS_VIEWED', value: parseInt(userid) })
      appDispatch({ type: 'SAVE_DATA' })
    }
    return () => {
      clearTimeout(timeout.current)
    }
  }, [statusIndex, userid])

  if (!user || !status) {
    return ''
  }

  if (statusIndex < 0 || user?.status.length - 1 < statusIndex) {
    return <Redirect to="/" />
  }
  let profileimg = user.profile
  if (!/^http/.test(profileimg)) {
    profileimg = '/img/' + profileimg
  }
  let statusimg = status.img
  if (!/^http/.test(statusimg)) {
    statusimg = '/img/' + statusimg
  }
  function handleClick(e) {
    console.log('clicked')
    if (e.clientX > window.innerWidth / 2) {
      setStatusIndex((prev) => prev + 1)
    } else {
      setStatusIndex((prev) => prev - 1)
    }
  }
  function handleMouseDown() {
    holdTimeout.current = setTimeout(pauseStatus, 200)
  }
  function pauseStatus() {
    const now = new Date()
    holdStartTime.current = now
    holded.current = true
    viewEle.current.classList.add('hold')
    clearTimeout(timeout.current)
  }
  function handleMouseUp() {
    viewEle.current.classList.remove('hold')
    clearTimeout(holdTimeout.current)
    if (holded.current) {
      holded.current = false
      clearTimeout(timeout.current)
      timeout.current = setTimeout(
        nextStatus,
        animationDuration -
          (holdStartTime.current - animationStartedTime.current)
      )
    }
  }
  function handleStart() {
    setLoading(false)
    animationStartedTime.current = new Date()
    timeout.current = setTimeout(nextStatus, animationDuration)
    viewEle.current.classList.remove('hold')
  }
  return (
    <>
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu} playStatus={handleMouseUp}>
          <Link to={`/chatscreen/${userid}`}>Open Chat</Link>
          <Link to={`/contactabout/${userid}`}>Open Contact</Link>
        </DropDown>
      )}
      <div
        className="status-view hold"
        onClick={handleClick}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        ref={viewEle}
      >
        <div className="header">
          <div className="top">
            <ProgressBars index={statusIndex} length={user.status.length} />
          </div>
          <div className="bottom">
            <div className="left">
              <Link to="/" className="fas fa-2x fa-arrow-left"></Link>
              <Link to={`/contactabout/${userid}`}>
                <img src={profileimg} alt="profile icon" />
              </Link>
              <Link to={`/contactabout/${userid}`}>
                <div className="container">
                  <div className="name">{user.name}</div>
                  <div className="time">{status.time}</div>
                </div>
              </Link>
            </div>
            <div className="right">
              <i
                className="fas fa-2x fa-ellipsis-v"
                onClick={(e) => {
                  pauseStatus()
                  setOpenMenu(true)
                  e.stopPropagation()
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className={'image ' + (loading ? 'loading' : '')}>
          <img
            className="status-image"
            onContextMenu={(e) => {
              e.preventDefault()
            }}
            onLoad={() => handleStart()}
            src={statusimg}
            alt=""
          />
          <img src={spinner} className="spinner" alt="Loading..." />
        </div>
        {status.caption ? <div className="caption">{status.caption}</div> : ''}
        <div className="reply">
          <i className="fas fa-2x fa-chevron-up"></i>
          <Link to={`/chatscreen/${userid}`}>REPLY</Link>
        </div>
      </div>
    </>
  )
}

export default StatusView
