// function to copy text to clipboard by creating textarea element

export default function copy(text) {
  var input = document.createElement('textarea')
  input.innerHTML = text
  document.body.appendChild(input)
  input.select()
  var result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}
