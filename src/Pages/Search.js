import { useContext, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ContactItem from '../Components/ContactItem'
import { UserContext } from '../Helpers/UserContext'
function Search(props) {
  const appState = useContext(UserContext)
  const [result, SetResult] = useState([])
  const [found, setFound] = useState(true)
  const inputEle = useRef(null)
  function find() {
    const value = inputEle.current.value.trim()
    if (!value) {
      setFound(true)
      SetResult([])
      return
    }
    const reg = new RegExp(value, 'i')
    const users = appState.filter((user) => reg.test(user.name))
    SetResult(users)
    if (users.length === 0) {
      setFound(false)
    } else {
      setFound(true)
    }
  }

  return (
    <div className="search-screen">
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <input
          type="text"
          ref={inputEle}
          onChange={find}
          placeholder="Search.."
          autoFocus={true}
        />
      </header>
      {result.map((user) => {
        return <ContactItem user={user} key={user.userIndex} />
      })}
      {!found && <div className="user-not-found">No results found</div>}
    </div>
  )
}

export default withRouter(Search)
