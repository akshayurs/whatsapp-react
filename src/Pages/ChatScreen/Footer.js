import { useRef, useContext, useState, memo } from 'react'
import ChangeImage from '../../Helpers/ChangeImage'
import { DispatchContext } from '../../Helpers/DispatchContext'
import { resizeFile } from '../../Helpers/imageResize'

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
    <footer style={{ background: ' #E5DDD5 url("/media/bg.png")' }}>
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
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: reply.content.replaceAll(/\n/g, ' '),
                }}
              ></div>

              <i
                onClick={() => {
                  setReply({ active: false })
                }}
                className="fas fa-times cancel"
              ></i>
            </div>
            {reply.isDocument?.type === 'image' && (
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
        <label htmlFor="camera-input">
          <i className="fas fa-2x fa-camera"></i>
        </label>
      </div>
      <div className="right">
        <label htmlFor="audio-input">
          <i
            className={
              'fas fa-2x fa-microphone mic ' +
              (inputVal.trim().length === 0 ? 'visible' : '')
            }
          ></i>
        </label>
        <i
          onClick={handleSubmit}
          className={
            'fas fa-2x fa-paper-plane send ' +
            (inputVal.trim().length > 0 ? 'visible' : '')
          }
        ></i>
      </div>
      <input
        type="file"
        accept="audio/*"
        id="audio-input"
        onChange={(e) => {
          const reader = new FileReader()
          reader.onload = function () {
            var str = this.result
            appDispatch({
              type: 'SEND_MSG',
              value: {
                content: {
                  isDocument: {
                    type: 'audio',
                  },
                  src: str,
                  showContent: false,
                  content: '<i class="fas fa-microphone mic "></i> audio',
                },
                userIndex: user.userIndex,
              },
            })
          }
          reader.readAsDataURL(e.target.files[0])
          e.target.value = ''
        }}
      />
      <input
        type="file"
        id="camera-input"
        accept="image/*"
        onChange={async (e) => {
          try {
            const image = await resizeFile(e.target.files[0], 600, 800)
            appDispatch({
              type: 'SEND_MSG',
              value: {
                content: {
                  isDocument: {
                    type: 'image',
                  },
                  src: image,
                  showContent: false,
                  content: '<i class="fas fa-image"></i> Photo',
                },
                userIndex: user.userIndex,
              },
            })
            e.target.value = ''
          } catch (err) {
            alert(err)
            e.target.value = ''
          }
        }}
      />
      <audio src="/media/sent.mp3" ref={soundEle}></audio>
    </footer>
  )
}

export default memo(Footer)
