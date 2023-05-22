<template>
  <nav class="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900 sticky top-0 z-20">

    <div class="flex flex-wrap items-center justify-between container px-4 mx-auto">
      <div>
        <a href="/" class="flex items-center">
          <img src="@/static/logo.png" class="h-6 mr-3 sm:h-9" alt="PI Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PiScan</span>
          <span v-if="network==='test'" class="bg-red-600 text-white ml-2 text-sm font-medium rounded-xl px-2">Testnet</span>
        </a>

        <PIPrice v-if="$route.path !== '/'" />
      </div>

      <div class="flex items-center md:order-2">

        <button data-collapse-toggle="mega-menu" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          </svg>
        </button>

      </div>

      <div id="mega-menu" class="items-center justify-between hidden w-full text-sm md:flex-col md:justify-end md:flex md:w-auto md:order-1 ml-auto">
        <div v-if="$route.path !== '/'" class="relative mt-3 md:mt-0 self-end mb-4 md:w-2/3">
          <SearchBox />
        </div>

        <ul class="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:items-center">
          <li>
            <a href="/" :class="[activeMenu==='/'?activeTextClass:defaultTextClass]" class="block py-2 pl-3 pr-4 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
          </li>

          <li>
            <button id="blockchainButton" data-dropdown-toggle="blockchainMenu" :class="[activeBlockchainMenu?activeTextClass:defaultTextClass]" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Blockchain
              <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="blockchainMenu" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/txs" :class="[activeMenu==='/txs'?activeTextClass:defaultTextClass]" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Transactions</a>
                </li>
                <li>
                  <a href="/txsPending" :class="[activeMenu==='/txsPending'?activeTextClass:defaultTextClass]" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pending Transactions</a>
                </li>
              </ul>
              <ul class="py-2 text-sm" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/blocks" :class="[activeMenu==='/blocks'?activeTextClass:defaultTextClass]" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Blocks</a>
                </li>
              </ul>
              <ul class="py-2 text-sm" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/accounts" :class="[activeMenu==='/accounts'?activeTextClass:defaultTextClass]" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Top Accounts</a>
                </li>
                <li v-show="chainNum">
                  <a href="/contractsVerified" :class="[activeMenu==='/contractsVerified'?activeTextClass:defaultTextClass]" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Verified Contracts</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <button id="epochsButton" data-dropdown-toggle="epochsMenu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Epochs
              <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="epochsMenu" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/epoch/-1" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Current</a>
                </li>
                <li>
                  <a href="/epochs" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Histories</a>
                </li>
              </ul>
            </div>
          </li>

          <li v-show="chainNum">
            <button id="tokenButton" data-dropdown-toggle="tokenMenu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Tokens
              <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="tokenMenu" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/tokens" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ERC20 Tokens By MarketCap</a>
                </li>
                <li>
                  <a href="/tokens-volume" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ERC20 Tokens By Volume</a>
                </li>
                <li>
                  <a href="/tokentxns" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View ERC20 Transfers</a>
                </li>
              </ul>
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/tokens-nft" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ERC721 Top Tokens</a>
                </li>
                <li>
                  <a href="/tokentxns-nft" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View ERC721 Transfers</a>
                </li>
              </ul>
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/tokens-nft1155" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ERC1155 Top Tokens</a>
                </li>
                <li>
                  <a href="/tokentxns-nft1155" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View ERC1155 Transfers</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <!-- <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Resources</a> -->
            <button id="resourcesButton" data-dropdown-toggle="resourcesMenu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Resources
              <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="resourcesMenu" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/charts" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Charts & Stats</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <button id="moreButton" data-dropdown-toggle="moreMenu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
              More <svg aria-hidden="true" class="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- grid grid-cols-2 md:grid-cols-3 -->
            <div id="moreMenu" class="absolute z-10 hidden w-auto  text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700  dark:bg-gray-700">
              <div class="p-4 text-gray-900 md:pb-4 dark:text-white">
                <strong class="mb-4 inline-block">Developers</strong>
                <ul class="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                  <li v-show="chainNum">
                    <a href="/verifyContract" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Verify Contract
                    </a>
                  </li>
                  <!-- <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Library
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Pro Version
                    </a>
                  </li> -->
                </ul>
              </div>
              <!-- <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                <ul class="space-y-4">
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Playground
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      License
                    </a>
                  </li>
                </ul>
              </div> -->
              <!-- <div class="p-4 text-gray-900 dark:text-white">
                <ul class="space-y-4">
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Support Center
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                      Terms
                    </a>
                  </li>
                </ul>
              </div> -->
            </div>
          </li>

          <li>
            <label for="chainId" class="inline-flex items-center rounded-md cursor-pointer dark:text-gray-800 py-2 pl-3 pr-4 md:p-0">
              <input id="chainId" v-model="chainNum" type="checkbox" class="hidden peer" @change="chainNumChange">
              <span class="px-4 py-1 rounded-l-md bg-blue-600 peer-checked:bg-gray-200 peer-checked:dark:bg-gray-600 peer-checked:text-inherit text-white">Main</span>
              <span class="px-4 py-1 rounded-r-md bg-gray-200 peer-checked:bg-blue-600 peer-checked:text-white">Subchain 1</span>
            </label>
          </li>

          <li>
            <a id="networkButton" href="javascript:;" data-dropdown-toggle="networkMenu" class="md:flex hidden bg-blue-50 p-2 rounded">
              <img src="@/static/logo.png" class="h-3" alt="FlowBite Logo" />
            </a>
            <button id="networkButton" data-dropdown-toggle="networkMenu" class="md:hidden flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Explorers
              <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="networkMenu" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="https://v2-piscan.plian.org" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PI Mainnet</a>
                </li>
                <li>
                  <a href="https://testnet-v2-piscan.plian.org" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PI Testnet</a>
                </li>
              </ul>
            </div>
          </li>

        </ul>
      </div>

    </div>
  </nav>
</template>

<script >
import { Dropdown } from 'flowbite'
import PIPrice from './components/PIPrice'
import { getChainNum, setChainNum } from '@/utils/chain'
export default {
  name: 'AppHeader',
  components: { PIPrice },
  data() {
    return {
      blockchainMenu: null,
      moreMenu: null,
      tokenMenu: null,
      resourcesMenu: null,
      chainNum: true,
      defaultTextClass: 'text-gray-700 dark:text-gray-400',
      activeTextClass: 'text-blue-600 dark:text-blue-500',
      network: process.env.NETWORK,
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    activeBlockchainMenu() {
      const path = this.$route.path
      return (
        path === '/txs' ||
        path === '/txsPending' ||
        path === '/blocks' ||
        path === '/accounts' ||
        path === '/contractsVerified'
      )
    },
    activeEpochsMenu() {
      const path = this.$route.path
      return path.includes('/epoch')
    },
  },
  mounted() {
    // console.log(this.network, 'net')
    this.initBlockchainMenu()
    this.initTokensMenu()
    this.initResourcesMenu()
    this.initMoreMenu()
    this.initEpochsMenu()
    this.initNetworkMenu()
  },
  created() {
    const chainNum = this.$route.query.chain || getChainNum()
    if (chainNum === undefined) {
      this.chainNum = false
      setChainNum(0)
    } else if (+chainNum === 1) {
      this.chainNum = true
      setChainNum(1)
    } else {
      this.chainNum = false
      setChainNum(0)
    }
    if (!this.$route.query.chain) {
      this.setQueryChain(this.chainNum ? 1 : 0)
    }
  },
  methods: {
    setQueryChain(chain) {
      this.$router.replace({ query: { ...this.$route.query, chain } })
    },
    chainNumChange(val) {
      if (val.target.checked) {
        setChainNum(1)
        this.$router.replace({ query: { ...this.$route.query, chain: 1 } })
      } else {
        setChainNum(0)
        this.$router.replace({ query: { ...this.$route.query, chain: 0 } })
      }
      setTimeout(() => {
        location.reload()
      }, 1)
    },
    initBlockchainMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('blockchainMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('blockchainButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.blockchainMenu = new Dropdown($targetEl, $triggerEl, options)
    },
    initTokensMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('tokenMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('tokenButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.tokenMenu = new Dropdown($targetEl, $triggerEl, options)
    },
    initResourcesMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('resourcesMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('resourcesButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.resourcesMenu = new Dropdown($targetEl, $triggerEl, options)
    },
    initEpochsMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('epochsMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('epochsButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.resourcesMenu = new Dropdown($targetEl, $triggerEl, options)
    },
    initNetworkMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('networkMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('networkButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.resourcesMenu = new Dropdown($targetEl, $triggerEl, options)
    },

    initMoreMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('moreMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('moreButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.moreMenu = new Dropdown($targetEl, $triggerEl, options)
    },
  },
}
</script>