import React, { useRef, useState, useEffect, useContext } from 'react'
import Slides from './Slides'
import NewIcon from './NewIcon'
import { useParams, withRouter } from 'react-router-dom'
import DropDown from './DropDown'
import { DispatchContext } from '../DispatchContext'

function HomeScreen(props) {
  useEffect(() => {
    if (slideContainer.current) {
      slideContainer.current.classList.remove('smooth')
    }
  }, [])
  const appDispatch = useContext(DispatchContext)
  let openSlideTo = window.sessionStorage.getItem('openSlideIndex') ?? 1
  if (parseInt(openSlideTo) === 0) {
    openSlideTo = 1
  }
  const slideContainer = useRef(null)
  const [openedSlide, setOpenedSlide] = useState(0)
  const prevOpenedSlide = useRef(0)
  const allowToStartCamera = useRef(false)
  const [startCamera, setStartCamera] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  function handleScroll(e) {
    const index = Math.ceil(
      slideContainer.current.scrollLeft / slideContainer.current.offsetWidth -
        0.1
    )
    if (index !== prevOpenedSlide.current) {
      setOpenedSlide(index)
      window.sessionStorage.setItem('openSlideIndex', index)
      prevOpenedSlide.current = index
      if (index === 0 && allowToStartCamera) {
        setStartCamera(true)
      }
      if (index !== 0) {
        allowToStartCamera.current = true
      }
    }
  }

  function moveSlide(e) {
    slideContainer.current.classList.add('smooth')
    setTimeout(() => {
      if (slideContainer.current) {
        slideContainer.current.classList.remove('smooth')
      }
    }, 100)
    slideContainer.current.scrollLeft =
      slideContainer.current.offsetWidth * e.target.dataset.slideIndex
  }

  useEffect(() => {
    slideContainer.current.scrollLeft =
      slideContainer.current.offsetWidth * openSlideTo
  }, [slideContainer])
  return (
    <div className="homescreen">
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu}>
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
        </DropDown>
      )}
      <header>
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
      <Slides
        slideContainer={slideContainer}
        handleScroll={handleScroll}
        startCamera={startCamera}
      />

      <NewIcon openedSlide={openedSlide} />
    </div>
  )
}

export default withRouter(HomeScreen)
