import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then((reg) => console.log('Service worker registered'))
//       .catch((err) => console.error(`Service Worker Error: ${err}`))
//   })
// } else {
//   console.log('Service Worker is not supported by browser.')
// }

serviceWorker.register()
