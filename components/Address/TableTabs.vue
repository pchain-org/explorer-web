<template>
  <!-- tabs -->
  <div class="container mx-auto px-4 mt-6">
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
          <li class="mr-2" role="presentation">
            <button id="transactions-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#transactions" type="button" role="tab" aria-controls="transactions" aria-selected="false">Transactions</button>
          </li>
          <!-- <li class="mr-2" role="presentation">
            <button id="internaltx-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#internaltx" type="button" role="tab" aria-controls="internaltx" aria-selected="false">Internal Txns</button>
          </li> -->
          <li class="mr-2" role="presentation">
            <button id="tokentxns-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#tokentxns" type="button" role="tab" aria-controls="tokentxns" aria-selected="false">ERC-20 Token Txns</button>
          </li>
          <li role="presentation">
            <button id="tokentxnsErc721-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#tokentxnsErc721" type="button" role="tab" aria-controls="tokentxnsErc721" aria-selected="false">ERC-721 Token Txns</button>
          </li>
          <li v-show="detail.isValidator" role="presentation">
            <button id="mine-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#mine" type="button" role="tab" aria-controls="mine" aria-selected="false">Validated Blocks</button>
          </li>
          <li role="presentation">
            <button id="analytics-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#analytics" type="button" role="tab" aria-controls="analytics" aria-selected="false">Analytics</button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">
        <div id="transactions" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="transactions-tab">
          <TransactionsTable v-if="activeTab === 'Transactions'" />
        </div>
        <!-- <div id="internaltx" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="internaltx-tab">
          <InternaltxTable v-if="activeTab === 'Internaltx'" />
        </div> -->
        <div id="tokentxns" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="tokentxns-tab">
          <TokentxnsTable v-if="activeTab === 'Tokentxns'" />
        </div>
        <div id="tokentxnsErc721" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="tokentxnsErc721-tab">
          <TokentxnsErc721Table v-if="activeTab === 'TokentxnsErc721'" />
        </div>
        <div id="mine" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="mine-tab">
          <MineTable v-if="activeTab === 'Mine'" />
        </div>
        <div id="analytics" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="analytics-tab">
          <AnalyticsTabs v-if="activeTab === 'Analytics'" />

        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { Tabs } from 'flowbite'

import TransactionsTable from '@/components/Address/Tables/TransactionsTable'
// import InternaltxTable from '@/components/Address/Tables/InternaltxTable'
import TokentxnsTable from '@/components/Address/Tables/TokentxnsTable'
import TokentxnsErc721Table from '@/components/Address/Tables/TokentxnsErc721Table'
import MineTable from '@/components/Address/Tables/MineTable'
import AnalyticsTabs from '@/components/Address/AnalyticsTabs'
export default {
  name: 'TableTabs',
  components: {
    TransactionsTable,
    // InternaltxTable,
    TokentxnsTable,
    TokentxnsErc721Table,
    MineTable,
    AnalyticsTabs,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabs: null,
      activeTab: 'Transactions',
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
        // {
        //   id: 'Internaltx',
        //   triggerEl: document.querySelector('#internaltx-tab'),
        //   targetEl: document.querySelector('#internaltx'),
        // },
        {
          id: 'Tokentxns',
          triggerEl: document.querySelector('#tokentxns-tab'),
          targetEl: document.querySelector('#tokentxns'),
        },
        {
          id: 'TokentxnsErc721',
          triggerEl: document.querySelector('#tokentxnsErc721-tab'),
          targetEl: document.querySelector('#tokentxnsErc721'),
        },
        {
          id: 'Mine',
          triggerEl: document.querySelector('#mine-tab'),
          targetEl: document.querySelector('#mine'),
        },
        {
          id: 'Analytics',
          triggerEl: document.querySelector('#analytics-tab'),
          targetEl: document.querySelector('#analytics'),
        },
      ]

      // options with default values
      const options = {
        defaultTabId: 'Transactions',
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