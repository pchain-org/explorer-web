import utilWeb3 from './web3'

/** 
 
const calcGas = async (web3, key, args, lastArg, ts) => {
  console.log('%clastArg: ', 'color: pink; background: #aaa;', lastArg)
  const lastBlock = await web3.eth.getBlockNumber()
  const gasTracker = null // 可从接口获取
  let gasPrice = 0
  if (
    gasTracker &&
    parseFloat(gasTracker.lastBlock) > parseFloat(lastBlock - 50)
  ) {
    gasPrice = gasTracker.medium
  } else {
    gasPrice = await web3.eth.getGasPrice()
  }

  const gas = await new Promise((resolve, reject) => {
    ts.estimateGas(
      {
        ...lastArg,
        gasPrice,
      },
      (e, r) => {
        if (e) {
          console.log('23')
          reject(e)
        } else {
          console.log('33')
          resolve(r)
        }
      }
    )
  })
  console.log(gasPrice, gas, 'gas')
  return {
    gasPrice,
    gas,
  }
}
*/

class MyContract {
  constructor(contract, abi, account) {
    this.contract = contract
    this.abi = abi
    this.account = account
    for (const key in this.contract.methods) {
      this[key] = (...args) => {
        const a = this.abi.find((a) => {
          return a.name === key
        })
        // console.log(key, ';key')
        return new Promise((resolve, reject) => {
          try {
            // const web3 = utilWeb3.getWeb3()
            if (a.inputs.length === args.length) {
              this.contract.methods[key](...args).call(
                {
                  from: this.account,
                },
                (e, r) => {
                  if (e) {
                    reject(e)
                  } else {
                    resolve(r)
                  }
                }
              )
            } else {
              const lastArg = args.pop()
              const ts = this.contract.methods[key](...args)
              ts.send(
                {
                  ...lastArg,
                },
                (e, r) => {
                  if (e) {
                    reject(e)
                  } else {
                    resolve(r)
                  }
                }
              )
              /** 估算gas会报"code": -32000, "message": "method handler crashed"
               * 暂时不估算gas，此bug待解决
               * */

              // calcGas(web3, key, args, lastArg, ts)
              //   .then(({ gas, gasPrice }) => {
              //     ts.send(
              //       {
              //         ...lastArg,
              //         gasPrice,
              //         gas,
              //       },
              //       (e, r) => {
              //         if (e) {
              //           reject(e)
              //         } else {
              //           resolve(r)
              //         }
              //       }
              //     )
              //   })
              //   .catch((e) => {
              //     reject(e)
              //   })
            }
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
}

export default {
  contractAt(abi, address, account) {
    try {
      const web3 = utilWeb3.getWeb3()
      const contract = new web3.eth.Contract(abi, address)
      const myContract = new MyContract(contract, abi, account)
      return myContract
    } catch (err) {
      return err
    }
  },
}
