<template>
  <div>
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li class="mr-2">
        <a id="an-tab-transactions" href="#" class="inline-block px-3 py-2 text-xs border text-white bg-blue-600 rounded-lg active">Transactions</a>
      </li>
      <li class="mr-2">
        <a id="an-tab-balance" href="#" class="inline-block px-3 py-2 text-xs border rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">PI Balance</a>
      </li>
      <li class="mr-2">
        <a id="an-tab-txnfees" href="#" class="inline-block px-3 py-2 text-xs border rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Txn Fees</a>
      </li>
      <li class="mr-2">
        <a id="an-tab-transfers" href="#" class="inline-block px-3 py-2 text-xs border rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">PI Transfers</a>
      </li>
      <li>
        <a id="an-tab-tokentran" href="#" class="inline-block px-3 py-2 text-xs border rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Token Transfers</a>
      </li>
    </ul>
    <div id="AnalyticsTabContent" class="w-full">
      <div id="an-transactions" class="w-full hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="profile-tab">
        <TransactionsChart v-if="activeTab === 'Transactions'" width="100%" height="500px" />
      </div>
      <div id="an-balance" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="dashboard-tab">
        <BalanceChart v-if="activeTab === 'PIBalance'" />
      </div>
      <div id="an-txnfees" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="settings-tab">
        <TxnFeesChart v-if="activeTab === 'TxnFees'" />
      </div>
      <div id="an-transfers" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="contacts-tab">
        <PITransfersChart v-if="activeTab === 'PITransfers'" />
      </div>
      <div id="an-tokentran" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="contacts-tab">
        <TokenTransfersChart v-if="activeTab === 'TokenTransfers'" />
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs } from 'flowbite'
import TransactionsChart from '@/components/Address/Charts/TransactionsChart'
import BalanceChart from '@/components/Address/Charts/BalanceChart'
import TxnFeesChart from '~/components/Address/Charts/TxnFeesChart'
import TokenTransfersChart from '~/components/Address/Charts/TokenTransfersChart'
import PITransfersChart from '~/components/Address/Charts/PITransfersChart'
export default {
  components: {
    TransactionsChart,
    BalanceChart,
    TxnFeesChart,
    TokenTransfersChart,
    PITransfersChart
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
          triggerEl: document.querySelector('#an-tab-transactions'),
          targetEl: document.querySelector('#an-transactions'),
        },
        {
          id: 'PIBalance',
          triggerEl: document.querySelector('#an-tab-balance'),
          targetEl: document.querySelector('#an-balance'),
        },
        {
          id: 'TxnFees',
          triggerEl: document.querySelector('#an-tab-txnfees'),
          targetEl: document.querySelector('#an-txnfees'),
        },
        {
          id: 'PITransfers',
          triggerEl: document.querySelector('#an-tab-transfers'),
          targetEl: document.querySelector('#an-transfers'),
        },
        {
          id: 'TokenTransfers',
          triggerEl: document.querySelector('#an-tab-tokentran'),
          targetEl: document.querySelector('#an-tokentran'),
        },
      ]

      // options with default values
      const options = {
        defaultTabId: 'Transactions',
        activeClasses: 'text-white bg-blue-600 active',
        inactiveClasses:
          'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white',
        onShow: (val) => {
          this.activeTab = val._activeTab.id
        },
      }
      this.tabs = new Tabs(tabElements, options)
    },
  },
}
</script>