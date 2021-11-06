import { useContext, useEffect, useState, useRef } from 'react'
import { useParams, withRouter } from 'react-router'
import ChangeImage from '../Helpers/ChangeImage'
import GetUserIndex from '../Helpers/GetUserIndex'
import { resizeFile } from '../Helpers/imageResize'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import { SortByKey } from '../Helpers/Sort'
import FlashMsg from '../Components/flashMsg'
function EditStatus(props) {
  const { userid } = useParams()
  const { myStatus } = props
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const [status, setStatus] = useState([])
  const [user, setUser] = useState({})
  const [statusViewed, setStatusViewed] = useState(false)
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
  function handleChange(index, key, value) {
    setStatus((prev) => {
      return prev.map((status) => {
        if (status.index === index) {
          return {
            ...status,
            [key]: value,
          }
        }
        return status
      })
    })
  }
  useEffect(() => {
    if (myStatus) {
      const metaData = JSON.parse(localStorage.getItem('metaDataWhatsapp'))
      if (metaData) {
        setUser({
          name: metaData.name,
          status: metaData.status,
          statusIndex: metaData.statusIndex,
        })
        setStatus(metaData.status)
      }
    } else if (appState.length !== 0) {
      const index = GetUserIndex(appState, parseInt(userid))
      setUser(appState[index])
      setStatus(appState[index].status)
      setStatusViewed(appState[index].statusViewed)
    }
  }, [appState, userid, myStatus])
  const sotredStatus = SortByKey(status, ['time'], true)
  return (
    <div className="editstatusscreen">
      {flashEle}
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <p>Edit Status - {myStatus ? 'My Status' : user.name}</p>
      </header>
      <div className="count">Count: {status.length}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (myStatus) {
            appDispatch({
              type: 'EDIT_META_DATA',
              value: {
                statusIndex: user.statusIndex,
                status,
              },
            })
          } else {
            appDispatch({
              type: 'UPDATE_STATUS',
              value: {
                statusIndex: user.statusIndex,
                status,
                userid,
                statusViewed,
              },
            })
          }
          setUser((prev) => {
            return { ...prev, status }
          })
          setFlashMsg('Saved')
          clearflash()
        }}
      >
        <div className="container">
          {!myStatus && (
            <>
              <label htmlFor="statusViewed">Status viewed</label>
              <input
                type="checkbox"
                id="statusViewed"
                checked={statusViewed}
                onChange={() => setStatusViewed((prev) => !prev)}
              />
            </>
          )}
        </div>
        {sotredStatus.map((item) => {
          let date = new Date(item.time)
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
          let uploadType = 1
          if (item.uploadType === 0) {
            uploadType = 0
          }
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
              <label>Upolad Image/Video:</label>
              <div className="image-upload-container">
                <label htmlFor={'localstorage-' + item.index}>
                  Storage (images only)
                </label>
                <input
                  type="radio"
                  name={'upload-' + item.index}
                  id={'localstorage-' + item.index}
                  required
                  checked={uploadType === 0}
                  onChange={() => {
                    handleChange(item.index, 'uploadType', 0)
                    handleChange(item.index, 'src', '')
                  }}
                />
                <label htmlFor={'fromurl-' + item.index}>
                  URL (images + Video)
                </label>
                <input
                  type="radio"
                  name={'upload-' + item.index}
                  id={'fromurl-' + item.index}
                  required
                  checked={uploadType === 1}
                  onChange={() => {
                    handleChange(item.index, 'uploadType', 1)
                    handleChange(item.index, 'src', '')
                  }}
                />
              </div>
              {uploadType === 0 ? (
                <input
                  type="file"
                  onChange={async (e) => {
                    try {
                      const image = await resizeFile(
                        e.target.files[0],
                        600,
                        800
                      )
                      handleChange(item.index, 'src', image)
                    } catch (err) {
                      alert(err)
                      e.target.value = ''
                    }
                  }}
                />
              ) : (
                <>
                  <label htmlFor={'url-' + item.index}>Url :</label>
                  <input
                    type="text"
                    id={'url-' + item.index}
                    value={item.src}
                    placeholder="http://example.com/video.mp4"
                    required
                    onChange={(e) => {
                      e.persist()
                      handleChange(item.index, 'src', e.target.value)
                    }}
                  />
                </>
              )}

              <label htmlFor={'caption-' + item.index}>
                Caption (optional) :
              </label>
              <input
                type="text"
                id={'caption-' + item.index}
                value={item.caption}
                onChange={(e) => {
                  e.persist()
                  handleChange(item.index, 'caption', e.target.value)
                }}
              />
              <label htmlFor={'uploaddate-' + item.index}>Uploaded on :</label>
              <input
                type="datetime-local"
                id={'uploaddate-' + item.index}
                required
                value={date.toISOString().slice(0, 16)}
                onChange={(e) => {
                  e.persist()
                  handleChange(
                    item.index,
                    'time',
                    new Date(e.target.value).getTime()
                  )
                }}
              />
              {myStatus && (
                <>
                  <label htmlFor={'statusViewedNumber-' + item.index}>
                    Status Viewed By :
                  </label>
                  <input
                    type="number"
                    id={'statusViewedNumber-' + item.index}
                    value={item.statusViewed}
                    required
                    onChange={(e) => {
                      handleChange(item.index, 'statusViewed', e.target.value)
                    }}
                  />
                </>
              )}
              <button
                className="delete"
                onClick={(e) => {
                  e.persist()
                  setStatus((prev) => {
                    return prev.filter((status) => status.index !== item.index)
                  })
                  setFlashMsg('Status Deleted')
                  clearflash()
                }}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          )
        })}
        <button
          className="addnewstatus"
          onClick={(e) => {
            e.preventDefault()
            setStatus((prev) => {
              let obj = {}
              if (myStatus) {
                obj = { statusViewed: 0 }
              }
              return prev.concat({
                src: 'image-placeholder.jpg',
                time: Date.now(),
                caption: '',
                index: user.statusIndex + 1,
                ...obj,
              })
            })
            setUser((prev) => {
              return { ...prev, statusIndex: prev.statusIndex + 1 }
            })
            setFlashMsg('New Status Added')
            clearflash()
          }}
        >
          <i className="fas fa-plus"></i>
          Add New Status
        </button>
        {user.status?.length !== 0 ||
        JSON.stringify(user.status) !== JSON.stringify(status) ? (
          <button
            type="submit"
            className="save"
            disabled={
              JSON.stringify(user.status) === JSON.stringify(status) &&
              (user.statusViewed === statusViewed || myStatus)
            }
          >
            Save Changes
          </button>
        ) : (
          ''
        )}
      </form>
    </div>
  )
}

export default withRouter(EditStatus)
