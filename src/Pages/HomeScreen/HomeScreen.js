import React, { useRef, useState, useEffect, useCallback } from 'react'
import Slides from './Slides'
import NewIcon from '../../components/NewIcon'

import Header from './Header'
function HomeScreen() {
  useEffect(() => {
    if (slideContainer.current) {
      slideContainer.current.classList.remove('smooth')
    }
  }, [])
  let openSlideTo = window.sessionStorage.getItem('openSlideIndex') ?? 1
  if (parseInt(openSlideTo) === 0) {
    openSlideTo = 1
  }
  const slideContainer = useRef(null)
  const [openedSlide, setOpenedSlide] = useState(0)
  const prevOpenedSlide = useRef(0)
  const allowToStartCamera = useRef(false)
  const [startCamera, setStartCamera] = useState(false)
  const handleScroll = useCallback(
    (e) => {
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
    },
    [slideContainer, prevOpenedSlide, setStartCamera]
  )

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
      <Header
        moveSlide={moveSlide}
        openedSlide={openedSlide}
      />
      <Slides
        slideContainer={slideContainer}
        handleScroll={handleScroll}
        startCamera={startCamera}
      />

      <NewIcon openedSlide={openedSlide} />
    </div>
  )
}

export default HomeScreen
