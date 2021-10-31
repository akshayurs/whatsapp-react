import React, { useContext, useEffect, useState } from 'react'
import StatusItem from '../../components/StatusItem'
import { UserContext } from '../../Helpers/UserContext'
import { SortByKeyLast } from '../../Helpers/Sort'
import ChangeImage from '../../Helpers/ChangeImage'
function StatusListSlide() {
  const appState = useContext(UserContext)
  const [imageSrc, setImageSrc] = useState('default.jpg')
  useEffect(() => {
    setTimeout(() => {
      const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
      setImageSrc(metaData.profile)
    }, 500)
  }, [])

  const filteredList = appState.filter((user) => user.status.length > 0)
  const sortedStatus = SortByKeyLast(filteredList, ['status', 'time'], false)

  return (
    <div className="slide-item status-screen">
      <label htmlFor="camerainput">
        <div className="add-status">
          <div className="image">
            <img src={ChangeImage(imageSrc)} alt="status" />
            <i className="fas fa-plus"></i>
          </div>
          <div className="container">
            <h2>My status</h2>
            <h3>Tap to add status update</h3>
          </div>
        </div>
      </label>
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

export default StatusListSlide
