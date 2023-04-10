import Cookies from 'js-cookie'

const ChainKey = 'Chain-Info'

export function getChain() {
  return Cookies.get(ChainKey)
}

export function setChain(num) {
  return Cookies.set(ChainKey, num)
}

export function removeChain() {
  return Cookies.remove(ChainKey)
}
