<template>

  <div class="relative overflow-x-auto">
    <div class="mb-4 text-sm flex justify-between items-center">
      <span>
        <svg class="h-5 inline-block align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Read Contract Information
      </span>
      <span class="text-blue-600 cursor-pointer" @click="handleOpenAll">{{ openAll?'[Collapse All]':'[Expand all]' }} </span>
    </div>

    <div v-for="(item,index) in data" :key="index" class="mb-3 border rounded-sm">
      <div class="border-b p-2 bg-gray-100 text-sm cursor-pointer flex justify-between" @click="item.isOpen=!item.isOpen">
        <span>{{ index+1 }} {{ item.function_name }}</span>
        <svg fill="none" class="w-5 h-5 ml-3 inline-block fill-current text-gray-600 transition-all duration-500" :class="[item.isOpen?'rotate-90': '']" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </div>
      <div class="overflow-hidden transition-all duration-500" :class="[item.isOpen?'max-h-screen':'max-h-0']">
        <div v-for="i in item.args.input" :key="i.name" class="p-2">
          <span class="text-sm inline-block mb-1">{{ i.name }}({{ i.type }})</span>
          <input v-model="i.value" type="text" :placeholder="`${i.name}(${i.type})`" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <div v-if="item.args.input && item.args.input.length" class="p-2">
          <button type="button" class="py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="handleRead(item,index)">
            Query
          </button>
          <svg v-if="item.isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
        </div>

        <div class="p-2 text-sm text-gray-500">
          <span class="inline-block w-3 h-3 border-l border-b border-gray-400"></span>

          <span v-for="(o,ind) in item.args.output" :key="ind">{{ o.type }}</span>
        </div>

        <div v-if="item.result" class="p-2 text-sm mb-3">
          <div class="mb-1 text-gray-500">[ <span class="font-medium">{{ item.function_name }}</span> method Response ]</div>

          <div>
            <svg class="inline-block h-3 mr-1 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
            </svg>
            <span class="text-gray-500">{{ item.args.output[0].type }}:</span>
            <span v-html="item.result"></span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Web3 from 'web3'
import { formatresult } from '@/utils/contract'
import { getChainNum } from '@/utils/chain'
let web3 = null
const networkList = {
  test: {
    0: {
      rpcUrl: 'https://testnet.plian.io/testnet',
    },
    1: {
      rpcUrl: 'https://testnet.plian.io/child_test',
    },
  },
  main: {
    0: {
      rpcUrl: 'https://mainnet.plian.io/pchain',
    },
    1: {
      rpcUrl: 'https://mainnet.plian.io/child_0',
    },
  },
}

export default {
  name: 'ReadContract',
  props: {
    tokenType: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      queryForm: {
        contract_address: '',
      },
      data: {},
      contractInstance: null,
      openAll: false,
    }
  },
  created() {
    this.queryForm.contract_address = this.$route.params.addr
    this.contractQueryByAddress()
    this.contractReadFuncQueryByAddress()
  },
  methods: {
    initweb3() {
      const network = process.env.NETWORK
      const chainNum = getChainNum()
      const rpcUrl = networkList[network][chainNum].rpcUrl || ''
      web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
    },
    initContractInstance(abi) {
      try {
        // use variables to retain formatting for abi
        const address = this.queryForm.contract_address
        this.contractInstance = new web3.eth.Contract(abi, address)
      } catch (err) {
        console.log(err.message)
      }
    },
    async contractQueryByAddress() {
      try {
        const res = await this.$api.contractQueryByAddress(this.queryForm)
        this.initweb3()
        this.initContractInstance(JSON.parse(res.data.Abi))
      } catch (error) {}
    },
    async contractReadFuncQueryByAddress() {
      try {
        const res = await this.$api.contractReadFuncQueryByAddress(
          this.queryForm
        )
        this.data =
          res.data.map((item) => ({
            ...item,
            isOpen: false, // 展开/关闭
            result: '', // 查询结果
            isLoading: false,
            args: {
              ...item.args,
              input:
                (item.args.input &&
                  item.args.input.map((i) => ({ ...i, value: '' }))) ||
                item.input,
              result: '',
            },
          })) || []
      } catch (error) {}
    },
    async handleRead(item, index) {
      this.data[index].isLoading = true
      const methodName = item.function_name
      const args = item.args.input.map((item) => item.value)
      try {
        const result = await this.contractInstance.methods[methodName](
          ...args
        ).call()
        this.data[index].result = formatresult(result, item.args.output[0].type)
        this.data[index].isLoading = false
      } catch (error) {
        this.data[index].result = `<span class="text-red-500">${error}</span>`
        this.data[index].isLoading = false
      }
    },
    handleOpenAll() {
      this.data.forEach((item) => {
        item.isOpen = !this.openAll
      })
      this.openAll = !this.openAll
    },
  },
}
</script>