<template>
  <div>
    <!-- inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white -->
    <button id="multiLevelDropdownButton" type="button" data-dropdown-toggle="chain-dropdown-menu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
      {{ netList[currentChain.networkNum] }} / {{ chainList[currentChain.chainNum] }}
    </button>
    <!-- Dropdown -->
    <div id="chain-dropdown-menu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" role="none" aria-labelledby="multiLevelDropdownButton">
        <li>
          <button id="mainNetDropdownButton" data-dropdown-toggle="mainNetDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Plian Mainnet
            <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div id="mainNetDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="mainNetDropdownButton">
              <li @click="chainChange(0, 0)">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                  <div class="inline-flex items-center">
                    Main
                  </div>
                </a>
              </li>
              <li @click="chainChange(0, 1)">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                  <div class="inline-flex items-center">
                    Subchain 1
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <button id="testNetDropdownButton" data-dropdown-toggle="testNetDropdown" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Plian Testnet
            <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div id="testNetDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="mainNetDropdownButton">
              <li @click="chainChange(1, 0)">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                  <div class="inline-flex items-center">
                    Main
                  </div>
                </a>
              </li>
              <li @click="chainChange(1, 1)">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                  <div class="inline-flex items-center">
                    Subchain 1
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
import { Dropdown } from 'flowbite'
import { getChain, setChain } from '@/utils/chain'
export default {
  name: 'ChainSelect',
  data() {
    return {
      netList: ['Plian Mainnet', 'Plian Testnet'],
      chainList: ['Main', 'Subchain 1'],
      currentChain: {
        networkNum: undefined,
        chainNum: undefined,
      },
      chainMenu: null,
      mainnetMenu: null,
      testnetMenu: null,
    }
  },
  created() {
    const chainInfo = getChain()
    if (chainInfo) {
      this.currentChain = JSON.parse(chainInfo)
    } else {
      this.currentChain = {
        networkNum: 0,
        chainNum: 0,
      }
      setChain(JSON.stringify(this.currentChain))
    }
  },
  mounted() {
    // this.initChainDropdownMenu()
    // this.initMainnetMenu()
  },
  methods: {
    chainChange(networkNum, chainNum) {
      this.currentChain = {
        networkNum,
        chainNum,
      }
      setChain(JSON.stringify(this.currentChain))
      location.reload()
    },
    initChainDropdownMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('chain-dropdown-menu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('multiLevelDropdownButton')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
          console.log('dropdown has been hidden')
        },
        onShow: () => {
          console.log('dropdown has been shown')
        },
        onToggle: () => {
          console.log('dropdown has been toggled')
        },
      }
      this.chainMenu = new Dropdown($targetEl, $triggerEl, options)
    },
    initMainnetMenu() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('mainNetDropdown')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('mainNetDropdownButton')
      // options with default values
      const options = {
        placement: 'left',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
          console.log('dropdown has been hidden')
        },
        onShow: () => {
          console.log('dropdown has been shown')
        },
        onToggle: () => {
          console.log('dropdown has been toggled')
        },
      }
      this.mainnetMenu = new Dropdown($targetEl, $triggerEl, options)
    },
  },
}
</script>