import React, { useEffect, useReducer } from 'react'
import HomeScreen from './components/HomeScreen'
import ContactAboutScreen from './components/ContactAboutScreen'
import NewChatScreen from './components/NewChatScreen'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ChatScreen from './components/ChatScreen'
import StatusView from './components/StatusView'
import { UsersList as sampleData, UsersList } from './sampleData'

import { UserContext } from './UserContext'
import { DispatchContext } from './DispatchContext'
import { FullScreenContext } from './FullScreenContext'

import './css/main.css'
import FullScreenModal from './components/FullScreenModal'
import Settings from './components/Settings'

function getTime(timestamp) {
  let date
  if (timestamp) {
    date = new Date(timestamp)
  } else {
    date = new Date()
  }
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let letter = 'AM'
  let hourZero = ''
  let minuteZero = ''
  if (hour >= 12) {
    letter = 'PM'
  }
  if (hour > 12) {
    hour = hour - 12
  }
  if (hour < 10) {
    hourZero = '0'
  }
  if (minutes < 10) {
    minuteZero = '0'
  }
  return `${hourZero}${hour}:${minuteZero}${minutes} ${letter}`
}
function openFullscreen() {
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    let elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }
}
function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return action.value
    case 'RESET_DATA':
      return UsersList
    case 'SEND_MSG': {
      const { content, userIndex } = action.value
      const draft = [...state]
      draft[userIndex].chatsList.push({
        index: ++draft[userIndex].messageIndex,
        type: 2,
        ...content,
        time: getTime(),
        status: 1,
      })
      return draft
    }
    case 'SAVE_DATA':
      localStorage.setItem('whatsAppUsersList', JSON.stringify(state))
      return state
    case 'STATUS_VIEWED': {
      const draft = [...state]
      let userIndex
      for (let index in draft) {
        if (draft[index].userIndex === action.value) {
          userIndex = index
          break
        }
      }
      draft[userIndex].statusViewed = true
      return draft
    }

    default:
      return new Error('INVALID TYPE')
  }
}
function App() {
  const [usersList, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const data = localStorage.getItem('whatsAppUsersList')
    if (data) {
      dispatch({ type: 'SET_DATA', value: JSON.parse(data) })
    } else {
      dispatch({ type: 'SET_DATA', value: sampleData })
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={usersList}>
        <DispatchContext.Provider value={dispatch}>
          <FullScreenContext.Provider value={openFullscreen}>
            {/* <FullScreenModal /> */}
            <BrowserRouter>
              <Switch>
                <Route path="/" exact>
                  <HomeScreen />
                </Route>
                <Route path="/contactabout/:userid">
                  <ContactAboutScreen />
                </Route>
                <Route path="/newchat">
                  <NewChatScreen />
                </Route>
                <Route path="/chatscreen/:userid">
                  <ChatScreen />
                </Route>
                <Route path="/statusview/:userid">
                  <StatusView />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
              </Switch>
            </BrowserRouter>
          </FullScreenContext.Provider>
        </DispatchContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
