import { useContext, useEffect, useState } from 'react'
import StatusItem from '../../Components/StatusItem'
import { UserContext } from '../../Helpers/UserContext'
import { SortByKeyLast } from '../../Helpers/Sort'
import ChangeImage from '../../Helpers/ChangeImage'
import { GetTime, GetDayAndMonth } from '../../Helpers/Time'
import { Link, withRouter } from 'react-router-dom'
function StatusListSlide(props) {
  const appState = useContext(UserContext)
  const [imageSrc, setImageSrc] = useState('default.jpg')
  const [myStatus, setMyStatus] = useState({ active: false })
  useEffect(() => {
    const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
    if (metaData) {
      readAndSetMetaData()
    } else {
      setTimeout(readAndSetMetaData, 500)
    }
  }, [])

  function readAndSetMetaData() {
    const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
    setImageSrc(metaData.profile)
    if (metaData && metaData.status.length > 0) {
      const lastStatus = metaData.status[metaData.status.length - 1]
      setMyStatus({
        active: true,
        src: lastStatus.src,
        time: lastStatus.time,
      })
    }
  }
  const filteredList = appState.filter((user) => user.status.length > 0)
  const sortedStatus = SortByKeyLast(filteredList, ['status', 'time'], false)

  return (
    <div className="slide-item status-screen">
      {myStatus.active ? (
        <Link to="/statusview/" className="my-status">
          <img src={ChangeImage(myStatus.src)} alt="" />
          <div className="container">
            <h2>My Status</h2>
            <h3>
              {`${GetDayAndMonth(myStatus.time)}, ${GetTime(myStatus.time)}`}
            </h3>
          </div>
        </Link>
      ) : (
        <Link to="/editstatus/" className="add-status">
          <div className="image">
            <img src={ChangeImage(imageSrc)} alt="status" />
            <i className="fas fa-plus"></i>
          </div>
          <div className="container">
            <h2>My status</h2>
            <h3>Tap to add status update</h3>
          </div>
        </Link>
      )}

      {appState.some((user) => !user.statusViewed) ? (
        <h2 className="title recent-status-title">Recent updates</h2>
      ) : (
        ''
      )}
      <div className="recent-status-container">
        {sortedStatus.map((user) =>
          !user.statusViewed ? (
            <StatusItem key={user.userIndex} user={user} />
          ) : (
            ''
          )
        )}
      </div>
      {filteredList.some((user) => user.statusViewed) ? (
        <h2 className="title viewed-status-title">Viewed updates</h2>
      ) : (
        ''
      )}

      <div className="viewed-status-container">
        {filteredList.map((user) =>
          user.statusViewed ? (
            <StatusItem key={user.userIndex} user={user} />
          ) : (
            ''
          )
        )}
      </div>
    </div>
  )
}

export default withRouter(StatusListSlide)
