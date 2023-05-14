import Cookies from 'js-cookie'

const ChainKey = 'Chain-Info'
const ChainNum = 'Chain-Num'

export function getChain() {
  return Cookies.get(ChainKey)
}

export function setChain(num) {
  return Cookies.set(ChainKey, num)
}

export function removeChain() {
  return Cookies.remove(ChainKey)
}

export function getChainNum() {
  return Cookies.get(ChainNum)
}

export function setChainNum(num) {
  return Cookies.set(ChainNum, num)
}

export function removeChainNum() {
  return Cookies.remove(ChainNum)
}
