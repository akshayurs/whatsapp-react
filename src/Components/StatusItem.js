import { Link } from 'react-router-dom'
import ChangeImage from '../Helpers/ChangeImage'
import { GetTime, GetDayAndMonth } from '../Helpers/Time'
function StatusItem(props) {
  const user = props.user
  let img = ChangeImage(user.status[user.status.length - 1].src)
  const time = user.status[user.status.length - 1].time
  let vars = {
    '--count': user.status.length,
  }
  if (user.status.length === 1) {
    vars = { ...vars, ...{ '--gap': '0deg' } }
  }
  return (
    <Link to={`/statusview/${user.userIndex}`} className="status-item">
      <div className="image" style={vars}>
        <div className="border"></div>
        <div className="whiteborder"></div>
        <img src={img} alt="status" />
      </div>
      <div className="container">
        <div className="name">{user.name}</div>
        <div className="time">
          {`${GetDayAndMonth(time)}, ${GetTime(time)}`}
        </div>
      </div>
    </Link>
  )
}

export default StatusItem
