import React, { useState, useContext } from 'react'
import OpenFullScreen from '../../Helpers/OpenFullScreen'
import DropDown from '../../components/DropDown'
import { DispatchContext } from '../../Helpers/DispatchContext'
import { Link, withRouter } from 'react-router-dom'

function Header(props) {
  const {
    moveSlide,
    openedSlide,
    headerState,
    setClickToSelect,
    selectedMessages,
  } = props
  const [openMenu, setOpenMenu] = useState(false)
  const appDispatch = useContext(DispatchContext)
  let headerTopEle = ''
  if (headerState.type === 0) {
    headerTopEle = (
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
            <a href={window.location.origin}>Hard Reload</a>
            <div
              onClick={() => {
                appDispatch({ type: 'RESET_DATA' })
                window.history.go(0)
              }}
            >
              Reset Data
            </div>
            <div
              onClick={() => {
                props.history.push('/about')
              }}
            >
              About
            </div>
            <div
              onClick={() => {
                props.history.push('/settings')
              }}
            >
              Settings
            </div>
            <a
              href={
                'whatsapp://send?text=' +
                encodeURI('Whatsapp Clone\n' + window.location.origin)
              }
            >
              Share Link
            </a>
          </DropDown>
        )}
        <div className="top">
          <div className="left">WhatsApp</div>
          <div className="right">
            <Link to="/search">
              <i className="fas fa-2x fa-search"></i>
            </Link>
            <i
              className="fas fa-2x fa-ellipsis-v"
              onClick={() => setOpenMenu(true)}
            ></i>
          </div>
        </div>
      </>
    )
  } else if (headerState.type === 1) {
    headerTopEle = (
      <div className="top">
        <div className="left">
          <i
            onClick={(e) => {
              setClickToSelect(false)
            }}
            className="fas fa-2x fa-times"
          ></i>
          <div className="count">{headerState.count}</div>
        </div>
        <div className="right">
          <i
            className="fas fa-2x fa-trash"
            onClick={(e) => {
              e.preventDefault()
              Array.from(selectedMessages.current).forEach((element) => {
                appDispatch({
                  type: 'CLEAR_CHAT',
                  value: { userid: parseInt(element) },
                })
              })
              setClickToSelect(false)
            }}
          ></i>
          <i
            className="fas fa-2x fa-ellipsis-v"
            onClick={() => setOpenMenu(true)}
          ></i>
        </div>
      </div>
    )
  }

  return (
    <header>
      {headerTopEle}

      <div className="bottom">
        <i
          onClick={moveSlide}
          className={
            'fas fa-camera small ' + (openedSlide === 0 ? 'active' : '')
          }
          data-slide-index="0"
        ></i>
        {['CHATS', 'STATUS', 'CALLS'].map((item, index) => (
          <div
            key={index}
            onClick={moveSlide}
            className={'title ' + (openedSlide === index + 1 ? 'active' : '')}
            data-slide-index={index + 1}
          >
            {item}
          </div>
        ))}
      </div>
    </header>
  )
}

export default withRouter(Header)
