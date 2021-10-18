import React from 'react'
function ProgressBars(props) {
  const { index, length } = props
  let progressBars = []
  for (let i = 0; i < length; i++) {
    if (index < i) {
      progressBars.push(<div key={i} className="progress"></div>)
    } else if (index > i) {
      progressBars.push(<div key={i} className="progress completed"></div>)
    } else {
      progressBars.push(<div key={i} className="progress active"></div>)
    }
  }
  return progressBars
}

export default ProgressBars
