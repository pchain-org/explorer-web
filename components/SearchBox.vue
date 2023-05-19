<template>
  <div class="flex">
    <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your
      Email</label>
    <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 md:inline-flex hidden items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
      {{ filterLabels[queryForm.filter] }}

      <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>

    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
        <li>
          <button type="button" data-id="token" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(0)">All Filters</button>
        </li>
        <li>
          <button type="button" data-id="address" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(1)">Addresses</button>
        </li>
        <li v-if="chainNum === '1'">
          <button type="button" data-id="address" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(2)">Tokens</button>
        </li>
        <li v-if="chainNum === '1'">
          <button type="button" data-id="address" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(3)">Websites</button>
        </li>
      </ul>
    </div>

    <div class="relative w-full">
      <input id="searchDropdown" v-model="queryForm.key" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg md:border-l-gray-50 md:border-l-1 rounded-l-lg md:rounded-l-none border focus:outline-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" :placeholder="inputPlaceholder" @keyup.enter="handleSearch" @input="inputSearch">
      <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="handleSearch">
        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
      <div id="searchDropdownMenu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 divide-y" aria-labelledby="dropdownDividerButton">
          <div v-if="dataList.addresses">
            <div class="px-4 py-2 font-medium">Addresses</div>
            <li v-for="(addr,index) in dataList.addresses" :key="index">
              <a :href="'/address/'+addr.address" class="block px-4 py-2 truncate w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ addr.address }}</a>
            </li>
          </div>
          <div v-if="dataList.tokens.erc20">
            <div class="px-4 py-2 font-medium">Tokens(ERC 20)</div>
            <li v-for="(addr) in dataList.tokens.erc20" :key="addr.address">
              <a :href="'/token/'+addr.address" class="flex px-4 py-2 truncate w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img v-if="addr.logo" :src="addr.logo" class="h-4" alt="">
                <img v-else src="@/static/logo_gray.png" alt="" class="h-4">
                <div class="flex-1 ml-3">
                  <div class="flex justify-between">
                    <div class="truncate w-2/3">
                      <span class="">{{ addr.name }} ({{ addr.symbol }})</span>
                      <span class="text-xs p-0.5 bg-gray-100 ml-1 rounded font-medium">${{ addr.price }}</span>
                    </div>
                    <svg v-if="addr.isVerified" fill="none" class="w-4 h-4 text-blue-600" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ addr.address }}</div>
                  <div v-if="addr.website" class="text-xs text-gray-500 mt-3">{{ addr.website }}</div>
                </div>
              </a>
            </li>
          </div>
          <div v-if="dataList.tokens.erc721">
            <div class="px-4 py-2 font-medium">Tokens(ERC 721)</div>
            <li v-for="(addr) in dataList.tokens.erc721" :key="addr.address">
              <a :href="'/token/'+addr.address" class="flex px-4 py-2 truncate w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img v-if="addr.logo" :src="addr.logo" class="h-4" alt="">
                <img v-else src="@/static/logo_gray.png" alt="" class="h-4">
                <div class="flex-1 ml-3">
                  <div class="flex justify-between">
                    <div class="truncate w-2/3">
                      <span class="">{{ addr.name }} ({{ addr.symbol }})</span>
                      <span class="text-xs p-0.5 bg-gray-100 ml-1 rounded font-medium">${{ addr.price }}</span>
                    </div>
                    <svg v-if="addr.isVerified" fill="none" class="w-4 h-4 text-blue-600" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ addr.address }}</div>
                  <div v-if="addr.website" class="text-xs text-gray-500 mt-3">{{ addr.website }}</div>
                </div>
              </a>
            </li>
          </div>
          <div v-if="dataList.tokens.erc1155">
            <div class="px-4 py-2 font-medium">Tokens(ERC 1155)</div>
            <li v-for="(addr) in dataList.tokens.erc1155" :key="addr.address">
              <a :href="'/token/'+addr.address" class="flex px-4 py-2 truncate w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <img v-if="addr.logo" :src="addr.logo" class="h-4" alt="">
                <img v-else src="@/static/logo_gray.png" alt="" class="h-4">
                <div class="flex-1 ml-3">
                  <div class="flex justify-between">
                    <div class="truncate w-2/3">
                      <span class="">{{ addr.name }} ({{ addr.symbol }})</span>
                      <span class="text-xs p-0.5 bg-gray-100 ml-1 rounded font-medium">${{ addr.price }}</span>
                    </div>
                    <svg v-if="addr.isVerified" fill="none" class="w-4 h-4 text-blue-600" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ addr.address }}</div>
                  <div v-if="addr.website" class="text-xs text-gray-500 mt-3">{{ addr.website }}</div>
                </div>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Dropdown } from 'flowbite'
import { isAddress, debounce } from '@/utils'
import { getChainNum } from '@/utils/chain'
// setChainNum
export default {
  data() {
    return {
      filterLabels: ['All Filters', 'Addresses', 'Tokens', 'Websites'],
      queryForm: {
        filter: 0, // 0: All 1: Addresses 2: Tokens 3: Websites
        key: '',
      },
      searchDropdown: null,
      inputSearch: null,
      dataList: {
        tokens: {
          erc20: null,
          erc721: null,
          erc1155: null,
        },
        addresses: null,
      },
      chainNum: getChainNum(),
    }
  },
  computed: {
    inputPlaceholder() {
      return this.chainNum === '1'
        ? 'Search by Address / Txn Hash / Block / Token'
        : 'Search by Address / Txn Hash / Block'
    },
  },
  mounted() {
    this.initSearchDropdown()
    this.inputSearch = debounce(this.autoSearch, 300)
  },
  methods: {
    initSearchDropdown() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('searchDropdownMenu')
      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('searchDropdown')
      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'none',
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
      this.searchDropdown = new Dropdown($targetEl, $triggerEl, options)
    },
    filterChange(val) {
      this.queryForm.filter = val
    },
    async autoSearch() {
      if (!this.queryForm.key) return
      try {
        const res = await this.$api.keySearch(this.queryForm)
        this.dataList = res.data
        if (
          this.dataList.addresses ||
          this.dataList.tokens.erc1155 ||
          this.dataList.tokens.erc20 ||
          this.dataList.tokens.erc721
        ) {
          this.searchDropdown.show()
        } else {
          this.searchDropdown.hide()
        }
      } catch (error) {
        return error
      }
    },
    handleSearch() {
      if (/^(0|[1-9][0-9]*)$/.test(this.queryForm.key)) {
        location.href = `/block/${this.queryForm.key}`
      } else if (
        this.queryForm.key.substring(0, 2) === '0x' &&
        this.queryForm.key.length === 66
      ) {
        location.href = `/tx/${this.queryForm.key}`
      } else if (isAddress(this.queryForm.key)) {
        location.href = `/address/${this.queryForm.key}`
      } else {
        location.href = `/search/?q=${this.queryForm.key}&f=${this.queryForm.filter}`
      }
    },
  },
}
</script>