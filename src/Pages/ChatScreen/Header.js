import React, { memo, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChangeImage from '../../Helpers/ChangeImage'
import DropDown from '../../components/DropDown'
import OpenFullScreen from '../../Helpers/OpenFullScreen'
function Header(props) {
  const { userid, user } = props
  const [openMenu, setOpenMenu] = useState(false)

  let profileimg = ChangeImage(user.profile)
  return (
    <>
      {openMenu && (
        <DropDown setOpenMenu={setOpenMenu}>
          <div
            onClick={() => {
              OpenFullScreen()
            }}
          >
            FullScreen
          </div>
          <Link to={'/contactabout/' + userid}>View Contact</Link>
        </DropDown>
      )}
      <div className="header">
        <div className="left">
          <i
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.history.go(-1)
            }}
            className="fas fa-2x fa-arrow-left"
          ></i>
          <Link to={'/contactabout/' + userid}>
            <img alt="profile icon" src={profileimg} />
          </Link>
          <Link to={'/contactabout/' + userid}>
            <div className="container">
              <div className="name">{user.name}</div>
              <div className="lastseen">
                {user.isOnline ? 'online' : user.lastseen}
              </div>
            </div>
          </Link>
        </div>
        <div className="right">
          <i className="fas fa-2x fa-video"></i>
          <i className="fas fa-2x fa-phone-alt"></i>
          <i
            className="fas fa-2x fa-ellipsis-v"
            onClick={(e) => {
              setOpenMenu(true)
              e.stopPropagation()
            }}
          ></i>
        </div>
      </div>
    </>
  )
}

export default memo(withRouter(Header))
