import React, { memo, useState, useContext, useRef, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../../Helpers/ChangeImage'
import DropDown from '../../components/DropDown'
import OpenFullScreen from '../../Helpers/OpenFullScreen'
import CopyText from '../../Helpers/CopyText'
import { DispatchContext } from '../../Helpers/DispatchContext'
import FlashMsg from '../../components/flashMsg'
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
            <div
              onClick={() => {
                OpenFullScreen()
              }}
            >
              FullScreen
            </div>
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

  return (
    <>
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu}>
          <div
            onClick={() => {
              OpenFullScreen()
            }}
          >
            FullScreen
          </div>
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
                {user.isOnline ? 'online' : user.lastseen}
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
