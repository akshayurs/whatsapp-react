export const GetTime = function (timestamp) {
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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const GetDayAndMonth = function (timestamp) {
  const today = new Date()
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  if (
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    if (today.getDate() === day) {
      return 'Today'
    }
    if (today.getDate() === day - 1) {
      return 'Yesterday'
    }
  }
  return `${day} ${month}`
}
