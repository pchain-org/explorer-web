import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider)

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function copyText(text) {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '100px'
    // 赋值
    textarea.value = text
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
}

export function getNowDate() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  const currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

export function isAddress(address) {
  return Web3.utils.isAddress(address)
}

export function StrCut2Arr(text, n) {
  // var str = this
  let str = text
  const arr = []
  const len = Math.ceil(str.length / n)
  for (let i = 0; i < len; i++) {
    if (str.length >= n) {
      const strCut = str.substring(0, n)
      arr.push(strCut)
      str = str.substring(n)
    } else {
      // str = str
      arr.push(str)
    }
  }
  return arr
}

// hex to number
export function hexToNumberString(hex) {
  return Web3.utils.hexToNumberString(hex)
}

// hex to address
export function hexToAddress(hex) {
  return web3.eth.abi.decodeParameter('address', hex).toString().toLowerCase()
}

// hex to text
export function hexToText(hex) {
  return Web3.utils.hexToAscii(hex)
}
