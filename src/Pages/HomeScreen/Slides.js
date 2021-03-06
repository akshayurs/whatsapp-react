import { memo } from 'react'
import CallListSlide from './CallListSlide'
import CameraSlide from './CameraSlide'
import ChatListSlide from './ChatListSlide'
import StatusListSlide from './StatusListSlide'

function Slides(props) {
  return (
    <div
      className="slides"
      ref={props.slideContainer}
      onScroll={() => {
        props.handleScroll()
      }}
    >
      <CameraSlide startCamera={props.startCamera} />
      <ChatListSlide
        setHeaderState={props.setHeaderState}
        clickToSelect={props.clickToSelect}
        setClickToSelect={props.setClickToSelect}
        selectedMessages={props.selectedMessages}
      />
      <StatusListSlide />
      <CallListSlide />
    </div>
  )
}

export default memo(Slides)
