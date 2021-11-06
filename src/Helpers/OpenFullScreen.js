// function to open full screen of browser only if website not in standalone (not installed)

export default function OpenFullScreen() {
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    let elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }
}
