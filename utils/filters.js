import * as timeago from 'timeago.js'

export function timeAgo(time) {
  return timeago.format(new Date(time))
}

export function time(item) {
  // const nowTimeStamp = new Date().getTime();
  // const updateTimeStamp = new Date(item.addtime).getTime();
  // const newTime = nowTimeStamp - updateTimeStamp;
  const newTime = item
  let finallyTime
  if (newTime / 1000 / 3600 / 24 < 1) {
    if (newTime / 1000 / 3600 < 1) {
      if (newTime / 1000 / 60 < 1) {
        finallyTime = parseInt(newTime / 1000) + ' seconds ago'
      } else {
        finallyTime = parseInt(newTime / 1000 / 60) + ' minutes ago'
      }
    } else {
      finallyTime = parseInt(newTime / 1000 / 3600) + ' hours ago'
    }
  } else {
    finallyTime = parseInt(newTime / 1000 / 3600 / 24) + ' days ago'
  }
  return finallyTime
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits = 2) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num, digits = 2) {
  if (digits !== null) {
    return (
      (+num || 0)
        .toFixed(digits)
        .toString()
        // .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
        .replace(/(\d{1,2})(?=(\d{3})+\.)/g, '$1,')
    )
  } else {
    // return (+num || 0).toString().replace(/(\d{1,2})(?=(\d{3})+\.)/g, '$1,')
    return (+num || 0)
      .toString()
      .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function ethToWei(eth) {
  return eth * 10 ** 9
}

export function timestampToTime(timestamp) {
  const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  const s = date.getSeconds()
  return Y + M + D + h + m + s
  // return new Date(Y + M + D + h + m + s).toDateString()
}
