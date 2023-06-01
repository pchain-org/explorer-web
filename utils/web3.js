import Web3 from 'web3'

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  )

export default {
  async connectWeb3() {
    let error = ''
    if (window.ethereum) {
      try {
        if (window.ethereum._state && !window.ethereum._state.initialized) {
          location.reload()
          return { error: 'ethereum is uninitialized' }
        }
        const t = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (!t) {
          error = 'MetaMask enable Error'
          return { error }
        }
        const web3 = new Web3(window.ethereum)
        window.wallet = web3
        const networkId = await promisify((cb) => web3.eth.getChainId(cb))
        const coinbase = await promisify((cb) => web3.eth.getCoinbase(cb))

        // window.ethereum.once('accountsChanged', this.accountsChanged)
        // window.ethereum.on('chainChanged', this.chainChanged)
        // window.ethereum.on('disconnect', this.disconnect)
        const walletType = 'metamask'
        return { networkId, coinbase, walletType }
      } catch (e) {
        error = e.message
      }
    } else {
      error = 'MetaMask not Install'
    }
    return { error }
  },
  async connectWallet(type) {
    return await this.connectWeb3()
  },
  async getTransaction(tx) {
    const web3 = this.getWeb3()
    try {
      return await promisify((cb) => web3.eth.getTransaction(tx, cb))
    } catch (e) {
      return { error: e.message }
    }
  },
  async getTransactionReceipt(tx) {
    const web3 = this.getWeb3()
    try {
      return await promisify((cb) => web3.eth.getTransactionReceipt(tx, cb))
    } catch (e) {
      return { error: e.message }
    }
  },
  async decodeLog(inputs, hexString, options) {
    const web3 = this.getWeb3()
    try {
      return await promisify((cb) =>
        web3.eth.abi.decodeLog(inputs, hexString, options, cb)
      )
    } catch (e) {
      return { error: e.message }
    }
  },
  getWeb3() {
    return window.wallet
  },
  async sign(message, address) {
    const web3 = window.wallet
    try {
      address = web3.utils.toChecksumAddress(address)
      const signature = await promisify((cb) =>
        web3.eth.personal.sign(message, address, cb)
      )
      return signature
    } catch (e) {
      return { error: e.message }
    }
  },
  checkWeb3() {
    return window.ethereum && window.ethereum.isConnected()
  },
  async getChainId() {
    const web3 = new Web3(window.ethereum)
    const networkId = await promisify((cb) => web3.eth.getChainId(cb))
    return networkId
  },
  async addNetwork(params) {
    try {
      const result = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params,
      })
      return result
    } catch (e) {
      return { error: e.message }
    }
  },
  async changeNetwork(network) {
    try {
      const result = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + network.chainId.toString(16) }],
      })
      return result
    } catch (e) {
      if (e.code === 4001) return { error: e.message }
      try {
        const result = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: network,
        })
        return result
      } catch (e) {
        return { error: e.message }
      }
    }
  },
}
