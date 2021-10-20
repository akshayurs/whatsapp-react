export default function getTime(timestamp) {
  let date
  if (timestamp) {
    date = new Date(timestamp)
  } else {
    date = new Date()
  }
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let letter = 'AM'
  let hourZero = ''
  let minuteZero = ''
  if (hour >= 12) {
    letter = 'PM'
  }
  if (hour > 12) {
    hour = hour - 12
  }
  if (hour < 10) {
    hourZero = '0'
  }
  if (minutes < 10) {
    minuteZero = '0'
  }
  return `${hourZero}${hour}:${minuteZero}${minutes} ${letter}`
}
