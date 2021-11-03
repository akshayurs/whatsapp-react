import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notfound">
      <h1>
        🙁
        <br />
        404
      </h1>
      <h2>
        <Link to="/">Back To Home Page</Link>
      </h2>
    </div>
  )
}

export default NotFound
