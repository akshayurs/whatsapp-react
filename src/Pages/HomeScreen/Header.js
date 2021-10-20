import React, { useState, useContext } from 'react'
import OpenFullScreen from '../../Helpers/OpenFullScreen'
import DropDown from '../../components/DropDown'
import { DispatchContext } from '../../Helpers/DispatchContext'
import { withRouter } from 'react-router-dom'

function Header(props) {
  const { moveSlide, openedSlide } = props
  const [openMenu, setOpenMenu] = useState(false)
  const appDispatch = useContext(DispatchContext)
  return (
    <header>
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
              appDispatch({ type: 'SAVE_DATA' })
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
          <i className="fas fa-2x fa-search"></i>
          <i
            className="fas fa-2x fa-ellipsis-v"
            onClick={() => setOpenMenu(true)}
          ></i>
        </div>
      </div>
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
