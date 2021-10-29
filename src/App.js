import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeScreen from './Pages/HomeScreen/HomeScreen'
import ContactAboutScreen from './Pages/ContactAboutScreen'
import NewChatScreen from './Pages/NewChatScreen'
import ChatScreen from './Pages/ChatScreen/ChatScreen'
import StatusView from './Pages/StatusView'
import EditUser from './Pages/EditUser'
import VideoCall from './Pages/VideoCall'
import VoiceCall from './Pages/VoiceCall'
import AboutScreen from './Pages/AboutScreen'
import EditData from './Pages/EditData'
import { UsersList as sampleData, metaData } from './Helpers/sampleData'
import { UserContext } from './Helpers/UserContext'
import { DispatchContext } from './Helpers/DispatchContext'
import reducer from './Helpers/Reducer'

import './css/main.css'
import Settings from './Pages/Settings'
import NotFound from './Pages/NotFound'
import Search from './Pages/Search'

function App() {
  const [usersList, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const data = localStorage.getItem('whatsAppUsersList')
    if (data) {
      dispatch({ type: 'SET_DATA', value: JSON.parse(data) })
    } else {
      dispatch({ type: 'SET_DATA', value: sampleData })
    }
    const metaDataTemp = localStorage.getItem('metaDataWhatsapp')
    if (!metaDataTemp) {
      localStorage.setItem('metaDataWhatsapp', JSON.stringify(metaData))
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
              <Route path="/about" exact>
                <AboutScreen />
              </Route>
              <Route path="/voicecall/:userid" exact>
                <VoiceCall />
              </Route>
              <Route path="/videocall/:userid" exact>
                <VideoCall />
              </Route>
              <Route path="/contactabout/:userid" exact>
                <ContactAboutScreen />
              </Route>
              <Route path="/edituser/:userid" exact>
                <EditUser />
              </Route>
              <Route path="/addnewuser/" exact>
                <EditUser addNewContact={true} />
              </Route>
              <Route path="/editmetadata/" exact>
                <EditUser isyourData={true} />
              </Route>
              <Route path="/editdata" exact>
                <EditData />
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
              <Route path="/search">
                <Search />
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
