import React, { useContext, useEffect, useState, useRef } from 'react'
import { Redirect, useParams, Link, withRouter } from 'react-router-dom'
import ProgressBars from '../components/ProgressBars'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import DropDown from '../components/DropDown'
import ChangeImage from '../Helpers/ChangeImage'
import OpenFullScreen from '../Helpers/OpenFullScreen'
const animationDuration = 5000

function StatusView(props) {
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
  let startedX = 0
  let currentX = 0
  let startedY = 0
  let currentY = 0

  function nextStatus() {
    setStatusIndex((prev) => prev + 1)
  }
  useEffect(() => {
    OpenFullScreen()
  }, [OpenFullScreen])
  useEffect(() => {
    setStatus(user?.status[statusIndex])
    if (viewEle.current) {
      viewEle.current.classList.add('temp-hold')
    }
    setLoading(true)
    if (user?.status?.length - 1 === statusIndex && !user.statusViewed) {
      appDispatch({ type: 'STATUS_VIEWED', value: parseInt(userid) })
    }
    return () => {
      clearTimeout(timeout.current)
    }
  }, [statusIndex, userid, appDispatch, user])

  if (!user || !status) {
    return ''
  }

  if (statusIndex < 0 || user?.status.length - 1 < statusIndex) {
    return <Redirect to="/" />
  }
  function handleClick(e) {
    if (e.clientX > window.innerWidth / 2) {
      setStatusIndex((prev) => prev + 1)
    } else {
      setStatusIndex((prev) => prev - 1)
    }
  }
  function handleMouseDown(e) {
    holdTimeout.current = setTimeout(pauseStatus, 200)
    e.persist()
    startedX = e.touches[0].clientX
    startedY = e.touches[0].clientY
  }
  function handleMouseMove(e) {
    e.persist()
    e.stopPropagation()
    currentX = e.touches[0].clientX
    currentY = e.touches[0].clientY

    let moveX = currentX - startedX
    let moveY = currentY - startedY
    if (moveY < 20 || moveX > 50) {
      viewEle.current.style.transform = `rotate(${moveX / 10}deg)`
    }
    if (moveX > -20 && moveX < 20 && moveY > 0) {
      viewEle.current.style.transform = `translateY(${moveY}px)`
    }
    if (moveX > 200 || moveX < -200 || moveY > 300) {
      props.history.go(-1)
    }
  }
  function pauseStatus() {
    if (!viewEle.current) {
      return
    }
    const now = new Date()
    holdStartTime.current = now
    holded.current = true
    viewEle.current.classList.add('hold')
    clearTimeout(timeout.current)
  }

  function handleMouseUp() {
    viewEle.current.classList.remove('hold')
    viewEle.current.style.transform = `rotate(0deg)`
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
    viewEle.current.classList.remove('temp-hold')
  }
  return (
    <div className="status-container">
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu} playStatus={handleMouseUp}>
          {!window.matchMedia('(display-mode: standalone)').matches ? (
            <div
              onClick={() => {
                OpenFullScreen()
              }}
            >
              FullScreen
            </div>
          ) : (
            ''
          )}
          <Link to={`/chatscreen/${userid}`}>Open Chat</Link>
          <Link to={`/contactabout/${userid}`}>Open Contact</Link>
        </DropDown>
      )}
      <div
        className="status-view temp-hold"
        onClick={handleClick}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
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
                <img src={ChangeImage(user.profile)} alt="profile icon" />
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
            src={ChangeImage(status.img)}
            alt=""
          />
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="2"
            ></circle>
          </svg>
        </div>
        {status.caption ? <div className="caption">{status.caption}</div> : ''}
        <div className="reply">
          <i className="fas fa-2x fa-chevron-up"></i>
          <Link to={`/chatscreen/${userid}`}>REPLY</Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(StatusView)
