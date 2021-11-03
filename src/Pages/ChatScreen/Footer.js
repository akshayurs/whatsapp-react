import { useRef, useContext, useState, memo } from 'react'
import ChangeImage from '../../Helpers/ChangeImage'
import { DispatchContext } from '../../Helpers/DispatchContext'

function Footer(props) {
  const { reply, setReply, user, inputEle } = props
  const soundEle = useRef(null)
  const appDispatch = useContext(DispatchContext)
  const [inputVal, setInputVal] = useState('')
  let inputEleLen = useRef(0)

  function handleInput(e) {
    e.persist()
    setInputVal(e.target.value)
    e.target.style.height = `${inputEleLen.current}px`
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  function handleSubmit() {
    if (!inputVal.trim()) {
      return
    }
    soundEle.current.play()
    let obj = {}

    if (reply.active) {
      let replyFor = {
        type: reply.type,
        content: reply.content,
        index: reply.index,
      }

      if (reply.isDocument) {
        replyFor = {
          ...replyFor,
          isDocument: true,
          src: reply.src,
        }
      }
      obj = {
        content: inputVal.trim(),
        isReply: true,
        replyFor,
      }
    } else {
      obj = {
        content: inputVal.trim(),
      }
    }
    appDispatch({
      type: 'SEND_MSG',
      value: {
        content: {
          ...obj,
        },
        userIndex: user.userIndex,
      },
    })
    setInputVal('')
    setReply({ active: false })
    inputEle.current.focus()
    setTimeout(() => {
      inputEle.current.style.height = `${inputEleLen.current}px`
      inputEle.current.style.height = `${inputEle.current.scrollHeight}px`
    }, 10)
  }
  return (
    <footer style={{ background: ' #E5DDD5 url("/img/bg.png")' }}>
      <div className={'left ' + (reply.active ? 'reply--visible' : '')}>
        {reply.active ? (
          <div
            className={
              'reply-container' + (reply.isDocument ? ' document ' : '')
            }
            data-active="false"
          >
            <div className="reply-left">
              <div className="name">{reply.type === 0 ? user.name : 'You'}</div>
              <div className="content">
                {reply.content.replaceAll(/\n/g, ' ')}
                {reply.isDocument && (
                  <>
                    <span className="fa">&#xf03e;</span> <span>Photo</span>
                  </>
                )}
              </div>

              <i
                onClick={() => {
                  setReply({ active: false })
                }}
                className="fas fa-times cancel"
              ></i>
            </div>
            {reply.isDocument && (
              <div className="reply-right">
                <img src={ChangeImage(reply.src)} alt="" />
              </div>
            )}
          </div>
        ) : (
          ''
        )}
        <i className="far fa-2x fa-laugh"></i>
        <textarea
          ref={inputEle}
          value={inputVal}
          onChange={handleInput}
          onKeyPress={(e) => {
            e.persist()
            if (e.key === '\n' && e.ctrlKey) {
              handleSubmit()
            }
          }}
          className="textbox message-box"
          placeholder="Type a message"
        />
        <i className="fas fa-2x fa-paperclip rotate"></i>
        <i className="fas fa-2x fa-camera"></i>
      </div>
      <div className="right">
        <i
          className={
            'fas fa-2x fa-microphone mic ' +
            (inputVal.trim().length === 0 ? 'visible' : '')
          }
        ></i>
        <i
          onClick={handleSubmit}
          className={
            'fas fa-2x fa-paper-plane send ' +
            (inputVal.trim().length > 0 ? 'visible' : '')
          }
        ></i>
      </div>
      <audio src="/audio/sent.mp3" ref={soundEle}></audio>
    </footer>
  )
}

export default memo(Footer)
