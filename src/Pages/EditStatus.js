import React, { useContext, useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router'
import ChangeImage from '../Helpers/ChangeImage'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'

function EditStatus(props) {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const [status, setStatus] = useState([])
  const [user, setUser] = useState({})
  useEffect(() => {
    if (appState.length !== 0) {
      const index = GetUserIndex(appState, parseInt(userid))
      setUser(appState[index])
      setStatus(appState[index].status)
    }
  }, [appState, userid])
  return (
    <div className="editstatusscreen">
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <p>Edit Status</p>
      </header>
      {status.map((item) => {
        let date = new Date(item.time)
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return (
          <div className="status-item" key={item.index}>
            {item.isVideo ? (
              <video
                src={ChangeImage(item.src)}
                className="status-media"
                controls
              ></video>
            ) : (
              <img
                src={ChangeImage(item.src)}
                alt="status media"
                className="status-media"
              />
            )}
            <label htmlFor="url">Url :</label>
            <input
              type="text"
              id="url"
              value={item.src}
              placeholder="http://example.com/video.mp4"
              onChange={(e) => {
                e.persist()
                setStatus((prev) => {
                  return prev.map((status) => {
                    if (status.index === item.index) {
                      return {
                        ...status,
                        src: e.target.value,
                      }
                    }
                    return status
                  })
                })
              }}
            />
            <label htmlFor="caption">Caption :</label>
            <input
              type="text"
              id="caption"
              value={item.caption}
              onChange={(e) => {
                e.persist()
                setStatus((prev) => {
                  return prev.map((status) => {
                    if (status.index === item.index) {
                      return {
                        ...status,
                        caption: e.target.value,
                      }
                    }
                    return status
                  })
                })
              }}
            />
            <label htmlFor="uploaddate">Uploaded on :</label>
            <input
              type="datetime-local"
              id="uploaddate"
              value={date.toISOString().slice(0, 16)}
              onChange={(e) => {
                e.persist()
                setStatus((prev) => {
                  return prev.map((status) => {
                    if (status.index === item.index) {
                      return {
                        ...status,
                        time: new Date(e.target.value).getTime(),
                      }
                    }
                    return status
                  })
                })
              }}
            />
            <button
              onClick={(e) => {
                e.persist()
                setStatus((prev) => {
                  return prev.filter((status) => status.index !== item.index)
                })
              }}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(EditStatus)
