export const SortByKey = function (arr, keys, toAscending) {
  if (keys.length === 1) {
    if (toAscending) {
      return arr.sort((a, b) => a[keys[0]] - b[keys[0]])
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
