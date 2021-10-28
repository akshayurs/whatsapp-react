import { UsersList } from './sampleData'
import { GetTime, SameDay } from './Time'
import GetUserIndex from './GetUserIndex'

function saveData(state) {
  localStorage.setItem('whatsAppUsersList', JSON.stringify(state))
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return action.value
    case 'RESET_DATA':
      localStorage.removeItem('whatsAppUsersList')
      return UsersList
    case 'SEND_MSG': {
      const { content, userIndex } = action.value
      const draft = [...state]
      const index = GetUserIndex(state, userIndex)
      draft[index].chatsList.push({
        index: ++draft[index].messageIndex,
        type: 2,
        ...content,
        time: Date.now(),
        status: 0,
      })
      saveData(draft)
      return draft
    }
    case 'SAVE_DATA':
      saveData(state)
      return state
    case 'STATUS_VIEWED': {
      if (action.value.statusIndex < 0) {
        return state
      }
      const draft = [...state]
      const userIndex = GetUserIndex(state, action.value.userid)
      if (draft[userIndex].status.length <= action.value.statusIndex) {
        return state
      }
      if (draft[userIndex].status.length === action.value.statusIndex + 1) {
        draft[userIndex].statusViewed = true
        draft[userIndex].openedStatus = 0
      } else {
        draft[userIndex].openedStatus = action.value.statusIndex
      }
      saveData(draft)
      return draft
    }
    case 'DELETE_MESSAGES': {
      const draft = [...state]
      const userIndex = GetUserIndex(state, parseInt(action.value.userid))
      const messages = draft[userIndex].chatsList.filter((msg) => {
        return !action.value.selectedMessages.has(msg.index)
      })
      draft[userIndex].chatsList = messages
      saveData(draft)
      return draft
    }
    case 'CLEAR_CHAT': {
      const draft = [...state]
      const userIndex = GetUserIndex(state, parseInt(action.value.userid))
      draft[userIndex].chatsList = []
      draft[userIndex].lastContentDate = 0
      saveData(draft)
      return draft
    }
    default:
      return new Error('INVALID TYPE')
  }
}
