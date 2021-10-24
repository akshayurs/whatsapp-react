export default function GetUserIndex(arr, id) {
  for (let i in arr) {
    if (arr[i].userIndex === id) {
      return i // index of user in array
    }
  }
}
