import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams, withRouter } from 'react-router'
import GetUserIndex from '../Helpers/GetUserIndex'
import { UserContext } from '../Helpers/UserContext'
import { DispatchContext } from '../Helpers/DispatchContext'
import { SortByKey } from '../Helpers/Sort'
import FlashMsg from '../components/flashMsg'
function EditCalls(props) {
  const { userid } = useParams()
  const appState = useContext(UserContext)
  const appDispatch = useContext(DispatchContext)
  const [calls, setCalls] = useState([])
  const [user, setUser] = useState({})
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
  function handleChange(index, key, value, invert) {
    setCalls((prev) => {
      return prev.map((calls) => {
        if (calls.index === index) {
          if (invert) {
            return {
              ...calls,
              [key]: !calls[key],
            }
          }
          return {
            ...calls,
            [key]: value,
          }
        }
        return calls
      })
    })
  }
  useEffect(() => {
    if (appState.length !== 0) {
      const index = GetUserIndex(appState, parseInt(userid))
      setUser(appState[index])
      setCalls(appState[index].calls)
    }
  }, [appState, userid])
  const sotredCalls = SortByKey(calls, ['time'], true)
  return (
    <div className="editcallsscreen">
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
        <p>Edit Calls - {user.name}</p>
      </header>
      <div className="count">Count: {calls.length}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          appDispatch({
            type: 'UPDATE_CALLS',
            value: { callsIndex: user.callsIndex, calls, userid },
          })
          setFlashMsg('Saved')
          clearflash()
        }}
      >
        {sotredCalls.map((item) => {
          let date = new Date(item.time)
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
          return (
            <div className="call-item" key={item.index}>
              <label htmlFor={'date-' + item.index}>Date and Time :</label>
              <input
                type="datetime-local"
                id={'date-' + item.index}
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
              <div className="container">
                <label
                  className="incomming-label"
                  htmlFor={'incomming-' + item.index}
                >
                  <i className="fas fa-long-arrow-alt-right"></i>Incomming
                </label>
                <input
                  type="radio"
                  name={'callfrom-' + item.index}
                  id={'incomming-' + item.index}
                  checked={item.isIncomming}
                  onChange={() => {
                    handleChange(item.index, 'isIncomming', null, true)
                  }}
                />
                <label
                  className="outgoing-label"
                  htmlFor={'outgoing-' + item.index}
                >
                  <i className="fas fa-long-arrow-alt-right"></i>Outgoing
                </label>
                <input
                  type="radio"
                  name={'callfrom-' + item.index}
                  id={'outgoing-' + item.index}
                  checked={!item.isIncomming}
                  onChange={() => {
                    handleChange(item.index, 'isIncomming', null, true)
                  }}
                />
              </div>
              {item.isIncomming ? (
                <div className="container">
                  <label htmlFor={'missed-' + item.index}>Missed</label>
                  <input
                    type="radio"
                    name={'callStatus-' + item.index}
                    id={'missed-' + item.index}
                    checked={item.isMissed}
                    onChange={() => {
                      handleChange(item.index, 'isMissed', null, true)
                    }}
                  />
                  <label htmlFor={'connected-' + item.index}>Connected</label>
                  <input
                    type="radio"
                    name={'callStatus-' + item.index}
                    id={'connected-' + item.index}
                    checked={!item.isMissed}
                    onChange={() => {
                      handleChange(item.index, 'isMissed', null, true)
                    }}
                  />
                </div>
              ) : (
                ''
              )}

              <div className="container">
                <label htmlFor={'Video-' + item.index}>
                  <i className="fas fa-video icon"></i>Video
                </label>
                <input
                  type="radio"
                  name={'callType-' + item.index}
                  id={'Video-' + item.index}
                  checked={item.isVideo}
                  onChange={() => {
                    handleChange(item.index, 'isVideo', null, true)
                  }}
                />
                <label htmlFor={'Voice-' + item.index}>
                  <i className="fas fa-phone-alt icon"></i>Voice
                </label>
                <input
                  type="radio"
                  name={'callType-' + item.index}
                  id={'Voice-' + item.index}
                  checked={!item.isVideo}
                  onChange={() => {
                    handleChange(item.index, 'isVideo', null, true)
                  }}
                />
              </div>

              <button
                className="delete"
                onClick={(e) => {
                  e.persist()
                  setCalls((prev) => {
                    return prev.filter((calls) => calls.index !== item.index)
                  })
                  setFlashMsg('Call Deleted')
                  clearflash()
                }}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          )
        })}
        <button
          className="addnewcall"
          onClick={(e) => {
            e.preventDefault()
            setCalls((prev) => {
              return prev.concat({
                index: user.callsIndex + 1,
                time: Date.now(),
                isVideo: true,
                isMissed: false,
                isIncomming: true,
              })
            })
            setUser((prev) => {
              return { ...prev, callsIndex: prev.callsIndex + 1 }
            })
            setFlashMsg('New Call Added')
            clearflash()
          }}
        >
          <i className="fas fa-plus"></i>
          Add New Calls
        </button>
        {user.calls?.length !== 0 ||
        JSON.stringify(user.calls) !== JSON.stringify(calls) ? (
          <button
            type="submit"
            className="save"
            disabled={JSON.stringify(user.calls) === JSON.stringify(calls)}
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

export default withRouter(EditCalls)
