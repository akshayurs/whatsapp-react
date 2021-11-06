import { memo } from 'react'
import { Link } from 'react-router-dom'

function NewIcon(props) {
  const { openedSlide } = props
  return (
    <div className={'new-chat-icon ' + (openedSlide !== 0 ? 'visible' : '')}>
      <Link to={'/newchat'}>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={'message ' + (openedSlide === 1 ? 'visible' : '')}
        >
          <path
            fill="currentColor"
            d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
          ></path>
        </svg>
      </Link>
      <Link to="/editstatus/">
        <i
          className={
            'fas fa-2x fa-camera camera ' + (openedSlide === 2 ? 'visible' : '')
          }
        ></i>
      </Link>

      <Link
        style={{ color: 'white' }}
        className={'phone ' + (openedSlide === 3 ? 'visible' : '')}
        to="/editdata/"
      >
        <i className="fas fa-2x fa-phone-alt"></i>
      </Link>
    </div>
  )
}

export default memo(NewIcon)
