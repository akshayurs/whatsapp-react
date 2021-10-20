import { UsersList } from './sampleData'
import GetTime from './GetTime'
export default function reducer(state, action) {
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
        time: GetTime(),
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
