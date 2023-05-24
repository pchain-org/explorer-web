import filterXSS from 'xss'
import BigNumber from 'bignumber.js'

function toFixed(x) {
  if (x.includes('e+')) {
    const value = new BigNumber(x)
    x = value.toString(10)
  }

  const reg = /'^[0-9]+$'/ // ensuring that the result is a number before linking it to unitconverter page

  if (reg.test(x) && x.length > 10) {
    return (
      "<a target='_blank' href='/unitconverter?wei=" + x + "'>" + x + '</a>'
    )
  }

  return x
}

function isInt(value) {
  if (isNaN(value)) {
    return false
  }
  return parseInt(value)
}

function getBool(val) {
  try {
    // to check the val is INT or not.
    const intVal = isInt(val)
    if (intVal) {
      //! ! is to cast the result into boolean
      return !!JSON.parse(String(intVal).toLowerCase())
    } else {
      return !!JSON.parse(String(val).toLowerCase())
    }
  } catch (err) {
    return false
  }
}

function remove0x(str1) {
  if (str1.startsWith('0x') === true) {
    str1 = str1.substr(str1.length - str1.length + 2)
  }
  return str1
}

export function formatresult(strResult, resulttype) {
  const temp = strResult
  // cleansing
  strResult = filterXSS(strResult)

  if (resulttype.startsWith('uint')) {
    return toFixed(strResult)
  } else if (resulttype === 'string') {
    return strResult
  } else if (resulttype === 'address') {
    if (strResult !== '0x0000000000000000000000000000000000000000') {
      return `<a href="/address/${strResult}" class="inline-block text-blue-600 dark:text-blue-500 hover:underline">${strResult}</a>`
    } else {
      return strResult
    }
  } else if (resulttype === 'bool') {
    return getBool(remove0x(strResult)).toString()
  } else if (
    resulttype.startsWith('tuple[') ||
    resulttype.startsWith('address[')
  ) {
    strResult = 'xxxspacexxx['
    temp.forEach(function (item) {
      strResult = strResult + '[' + filterXSS(item) + ']xxxspacexxx'
    })
    // to avoid extra new line
    if (strResult.endsWith('xxxspacexxx')) {
      strResult = strResult.substring(0, strResult.length - 11)
    }
    strResult = strResult + ']'
    return strResult
  } else {
    return strResult
  }
}
