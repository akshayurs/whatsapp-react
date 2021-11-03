import { memo, useState, useContext, useRef, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../../Helpers/ChangeImage'
import DropDown from '../../Components/DropDown'
import OpenFullScreen from '../../Helpers/OpenFullScreen'
import CopyText from '../../Helpers/CopyText'
import { GetTime, GetDayAndMonth, FormatedDate } from '../../Helpers/Time'
import { DispatchContext } from '../../Helpers/DispatchContext'
import FlashMsg from '../../Components/flashMsg'
function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
function generateData(chats, name) {
  let text = ''
  chats.forEach((chat) => {
    text += `${FormatedDate(chat.time)}, ${GetTime(chat.time)} - ${
      chat.type === 1 ? name : 'You'
    } : ${chat.content}\n`
  })
  return text
}
function Header(props) {
  const { userid, user, headerState, setClickToSelect, selectedMessages } =
    props
  const [openMenu, setOpenMenu] = useState(false)
  const appDispatch = useContext(DispatchContext)
  let profileimg = ChangeImage(user.profile)
  const [flashMsg, setFlashMsg] = useState('')
  const flashTimeout = useRef(null)
  let flashEle = ''
  if (flashMsg !== '') {
    flashEle = <FlashMsg message={flashMsg} />
  }
  useEffect(() => {
    return () => {
      clearTimeout(flashTimeout.current)
      setFlashMsg('')
    }
  }, [])
  function clearflash() {
    clearTimeout(flashTimeout.current)
    flashTimeout.current = setTimeout(() => {
      setFlashMsg('')
    }, 2100)
  }
  if (headerState.type === 1) {
    return (
      <>
        {openMenu && (
          <DropDown setOpenMenu={setOpenMenu}>
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
          </DropDown>
        )}
        <div className="header">
          <div className="left">
            <i
              onClick={(e) => {
                setClickToSelect(false)
              }}
              className="fas fa-2x fa-times"
            ></i>
            <div className="container">
              <div className="count">{headerState.count}</div>
            </div>
          </div>
          <div className="right">
            <i
              className="fas fa-2x fa-trash"
              onClick={(e) => {
                e.preventDefault()
                appDispatch({
                  type: 'DELETE_MESSAGES',
                  value: { selectedMessages, userid },
                })
                setFlashMsg('Deleted')
                clearflash()
                setClickToSelect(false)
              }}
            ></i>
            {headerState.count === 1 ? (
              <i
                className="fas fa-2x fa-copy"
                onClick={() => {
                  const text = document
                    .querySelector(
                      `[data-message-index="${
                        [...selectedMessages][0]
                      }"] .main .content`
                    )
                    .innerHTML.replaceAll(/<br>/g, '\n')
                  CopyText(text)
                  setFlashMsg('Copied')
                  clearflash()
                  setClickToSelect(false)
                }}
              ></i>
            ) : (
              ''
            )}
            <i
              className="fas fa-2x fa-ellipsis-v"
              onClick={(e) => {
                setOpenMenu(true)
                e.stopPropagation()
              }}
            ></i>
          </div>
        </div>
        {flashEle}
      </>
    )
  }
  let lastSeen
  const day = GetDayAndMonth(user.lastSeen)
  if (day === 'Today') {
    lastSeen = GetTime(user.lastSeen)
  } else {
    lastSeen = `${day}, ${GetTime(user.lastSeen)}`
  }

  return (
    <>
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu}>
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
          <Link to={'/contactabout/' + userid}>View Contact</Link>
          <div
            onClick={() => {
              appDispatch({ type: 'CLEAR_CHAT', value: { userid } })
              setFlashMsg('Cleared')
              clearflash()
            }}
          >
            Clear Chat
          </div>
          <div
            onClick={() => {
              download(
                `${user.name}-chats.txt`,
                generateData(user.chatsList, user.name)
              )
              setFlashMsg('Exported')
              clearflash()
            }}
          >
            Export Chat
          </div>
          <Link to={`/edituser/${userid}`}>Edit contact</Link>
        </DropDown>
      )}
      <div className="header">
        <div className="left">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <Link to={'/contactabout/' + userid}>
            <img alt="profile icon" src={profileimg} />
          </Link>
          <Link to={'/contactabout/' + userid}>
            <div className="container">
              <div className="name">{user.name}</div>
              <div className="lastseen">
                {user.isOnline ? 'online' : lastSeen}
              </div>
            </div>
          </Link>
        </div>
        <div className="right">
          <Link to={'/videocall/' + userid}>
            <i className="fas fa-2x fa-video"></i>
          </Link>
          <Link to={'/voicecall/' + userid}>
            <i className="fas fa-2x fa-phone-alt"></i>
          </Link>
          <i
            className="fas fa-2x fa-ellipsis-v"
            onClick={(e) => {
              setOpenMenu(true)
              e.stopPropagation()
            }}
          ></i>
        </div>
      </div>
      {flashEle}
    </>
  )
}

export default memo(withRouter(Header))
