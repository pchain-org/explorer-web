<template>
  <!-- tabs -->
  <div class="container mx-auto px-4 mt-6">
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
          <li class="mr-2" role="presentation">
            <button id="transactions-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#transactions" type="button" role="tab" aria-controls="transactions" aria-selected="false">Transfers</button>
          </li>
          <li class="mr-2" role="presentation">
            <button id="holders-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#holders" type="button" role="tab" aria-controls="holders" aria-selected="false">Holders</button>
          </li>
          <li v-show="tokenInfo.overview.token_types === 2" class="mr-2" role="presentation">
            <button id="inventory-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#inventory" type="button" role="tab" aria-controls="inventory" aria-selected="false">Inventory</button>
          </li>
          <li role="presentation">
            <button id="info-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="false">Info</button>
          </li>
          <li role="presentation">
            <button id="contract-tab" class="inline-block relative p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#contract" type="button" role="tab" aria-controls="contract" aria-selected="false">Contract
              <svg v-show="IsVerfied" class="absolute inline-block w-4 h-4 text-green-500 align-middle top-2 -right-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </li>
          <li role="presentation">
            <button id="analytics-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#analytics" type="button" role="tab" aria-controls="analytics" aria-selected="false">Analytics</button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">
        <div id="transactions" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="transactions-tab">
          <TransactionsTable v-if="activeTab === 'Transactions'" :token-type="tokenInfo.overview.token_types" />
        </div>
        <div id="holders" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="holders-tab">
          <HoldersTable v-if="activeTab === 'Holders'" :token-type="tokenInfo.overview.token_types" />
        </div>
        <div id="inventory" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="inventory-tab">
          <InventoryTable v-if="activeTab === 'Inventory'" :token-type="tokenInfo.overview.token_types" />
        </div>
        <div id="info" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="info-tab">

          <div class="text-gray-500 mb-3">OVERVIEW</div>
          <div>{{ tokenInfo.overview.token_introduction }}</div>
          <!-- <TokentxnsErc721Table v-if="activeTab === 'info'" /> -->
        </div>
        <div id="contract" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="contract-tab">
          <div class="mb-4">
            <button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-500" @click="activeTab='code'">Code</button>
            <button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-500" @click="activeTab='readContract'">Read Contract</button>
            <button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-500" @click="activeTab='writeContract'">Write Contract</button>
          </div>

          <ContractInfo v-if="activeTab === 'code' || activeTab==='Contract'" ref="contractInfo" @getVerifiedStatus="IsVerfied = $event" />
          <ReadContract v-if="activeTab === 'readContract'" />
          <WriteContract v-if="activeTab === 'writeContract'" />

        </div>
        <div id="analytics" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="analytics-tab">
          <!-- <AnalyticsTabs v-if="activeTab === 'Analytics'" /> -->

        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { Tabs } from 'flowbite'

import TransactionsTable from '@/components/Token/Tables/TransactionsTable'
import HoldersTable from '@/components/Token/Tables/HoldersTable'
import ContractInfo from '@/components/Token/ContractTab/ContractInfo'
import ReadContract from '@/components/Token/ContractTab/ReadContract'
import WriteContract from '@/components/Token/ContractTab/WriteContract'
import InventoryTable from '@/components/Token/Tables/InventoryTable'
export default {
  name: 'TableTabs',
  components: {
    TransactionsTable,
    HoldersTable,
    ContractInfo,
    InventoryTable,
    ReadContract,
    WriteContract,
  },
  props: {
    tokenInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabs: null,
      activeTab: 'Transactions',
      IsVerfied: false,
    }
  },
  mounted() {
    this.initTabs()
  },
  methods: {
    initTabs() {
      // create an array of objects with the id, trigger element (eg. button), and the content element
      const tabElements = [
        {
          id: 'Transactions',
          triggerEl: document.querySelector('#transactions-tab'),
          targetEl: document.querySelector('#transactions'),
        },
        {
          id: 'Holders',
          triggerEl: document.querySelector('#holders-tab'),
          targetEl: document.querySelector('#holders'),
        },
        {
          id: 'Inventory',
          triggerEl: document.querySelector('#inventory-tab'),
          targetEl: document.querySelector('#inventory'),
        },
        {
          id: 'Info',
          triggerEl: document.querySelector('#info-tab'),
          targetEl: document.querySelector('#info'),
        },
        {
          id: 'Contract',
          triggerEl: document.querySelector('#contract-tab'),
          targetEl: document.querySelector('#contract'),
        },
        {
          id: 'Analytics',
          triggerEl: document.querySelector('#analytics-tab'),
          targetEl: document.querySelector('#analytics'),
        },
      ]
      // if (this.tokenInfo.overview.token_types === 2) {
      //   tabElements.push({
      //     id: 'Inventory',
      //     triggerEl: document.querySelector('#inventory-tab'),
      //     targetEl: document.querySelector('#inventory'),
      //   })
      // }

      // options with default values
      const options = {
        defaultTabId: 'Contract',
        activeClasses:
          'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
        inactiveClasses:
          'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
        onShow: (val) => {
          this.activeTab = val._activeTab.id
        },
      }
      this.tabs = new Tabs(tabElements, options)
    },
  },
}
</script>
