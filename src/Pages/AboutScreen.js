import React from 'react'
import { withRouter } from 'react-router-dom'

function AboutScreen(props) {
  return (
    <div className="aboutpage">
      <header>
        <i
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.history.go(-1)
          }}
          className="fas fa-2x fa-arrow-left"
        ></i>
        <h1>About</h1>
      </header>
      <div className="container">
        <h1 className="title">ABOUT</h1>
        <div className="item whatsapp">
          <div className="left">
            <i className="fab fa-react"></i>
          </div>
          <div className="right">Whatsapp Clone With React</div>
        </div>
        <a href="#" className="item">
          <div className="left">
            <i className="fas fa-globe"></i>
          </div>
          <div className="right">View Website</div>
        </a>
        <a
          href="https://github.com/akshayurs/whatsapp-react"
          target="_blank"
          rel="noopener noreferrer"
          className="item"
        >
          <div className="left">
            <i className="fas fa-code"></i>
          </div>
          <div className="right">View Code</div>
        </a>
      </div>
      <div className="container">
        <h1 className="title">FOLLOW ME</h1>
        <a
          href="https://github.com/akshayurs"
          target="_blank"
          rel="noopener noreferrer"
          className="item"
        >
          <div className="left">
            <i className="fab fa-github"></i>
          </div>
          <div className="right">Github</div>
        </a>
        <a
          href="https://www.linkedin.com/in/akshayurs"
          target="_blank"
          rel="noopener noreferrer"
          className="item"
        >
          <div className="left">
            <i className="fab fa-linkedin-in"></i>
          </div>
          <div className="right">Linkedin</div>
        </a>
      </div>
      <div className="version">
        <i className="fab fa-whatsapp"></i> Whatsapp Clone V1.0
      </div>
    </div>
  )
}

export default withRouter(AboutScreen)
