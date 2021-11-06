// return the sorted array for given key
// used to sort contacts

export const SortByKey = function (arr, keys, toAscending) {
  if (keys.length === 1) {
    if (toAscending) {
      return arr.sort((a, b) => {
        let first = a[keys[0]]
        let second = b[keys[0]]
        if (keys[0] === 'name') {
          first = first.toLowerCase()
          second = second.toLowerCase()
        }
        if (first < second) {
          return -1
        }
        if (first > second) {
          return 1
        }
        return 0
      })
    } else {
      return arr.sort((b, a) => a[keys[0]] - b[keys[0]])
    }
  }
  if (keys.length === 2) {
    if (toAscending) {
      return arr.sort((a, b) => a[keys[0]][keys[1]] - b[keys[0]][keys[1]])
    } else {
      return arr.sort((b, a) => a[keys[0]][keys[1]] - b[keys[0]][keys[1]])
    }
  }
}

// sort the given array by key name with last item of the sub array
// used for sorting chats and status by latest item

export const SortByKeyLast = function (arr, keys, toAscending) {
  if (toAscending) {
    return arr.sort((a, b) => {
      const length1 = a[keys[0]].length
      const length2 = b[keys[0]].length
      return a[keys[0]][length1 - 1][keys[1]] - b[keys[0]][length2 - 1][keys[1]]
    })
  } else {
    return arr.sort((b, a) => {
      const length1 = a[keys[0]].length
      const length2 = b[keys[0]].length
      return a[keys[0]][length1 - 1][keys[1]] - b[keys[0]][length2 - 1][keys[1]]
    })
  }
}
