import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeScreen from './Pages/HomeScreen/HomeScreen'
import ContactAboutScreen from './Pages/ContactAboutScreen'
import NewChatScreen from './Pages/NewChatScreen'
import ChatScreen from './Pages/ChatScreen/ChatScreen'
import StatusView from './Pages/StatusView'

import { UsersList as sampleData } from './Helpers/sampleData'
import { UserContext } from './Helpers/UserContext'
import { DispatchContext } from './Helpers/DispatchContext'
import reducer from './Helpers/Reducer'

import './css/main.css'
import Settings from './Pages/Settings'
import NotFound from './Pages/NotFound'

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
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </BrowserRouter>
        </DispatchContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
