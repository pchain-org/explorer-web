<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium pb-5">
      <div class="text-gray-500 md:mb-0 mb-3" v-if="!all">
        <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
        </svg>
        Latest <span style="color: #e00585;">{{ data.contract_trade_count }}</span> from a total of <span
          style="color: #e00585;">{{ data.counts | toThousandFilter(null) }}</span> transactions
      </div>
      <div class="text-gray-500 md:mb-0 mb-3" v-else>
        <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
        </svg>
        Latest total of <span style="color: #e00585;">{{ data.counts | toThousandFilter(null) }}</span> transactions found
      </div>
      <!-- !!TODO -->
      <div class="bg-white border-solid border-slate-300 px-3 py-2 rounded-lg">
        <button id="filterBtn" data-dropdown-toggle="filter-menu"
          class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
          {{ filter }} <svg aria-hidden="true" class="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div id="filter-menu"
        class="z-10 hidden mine-control font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-1 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
          <li @click="selectFilter('View Completed Txns')">
            <p class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              View Completed Txns
            </p>
          </li>
          <li @click="selectFilter('View Pending Txns')">
            <p class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              View Pending Txns
            </p>
          </li>
        </ul>
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Txn Hash
          </th>
          <th scope="col" class="px-6 py-3">
            Method
          </th>
          <th scope="col" class="px-6 py-3">
            Block
          </th>
          <th scope="col" class="px-6 py-3">
            Age
          </th>
          <th scope="col" class="px-6 py-3">
            From
          </th>
          <th scope="col" class="px-6 py-3">

          </th>
          <th scope="col" class="px-6 py-3">
            To
          </th>
          <th scope="col" class="px-6 py-3">
            Value
          </th>
          <th scope="col" class="px-6 py-3">
            [Txn Fee]
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.trade_list" :key="item.block_no"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <a :href="'/tx/' + item.trade_hash"
              class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_hash }}</a>
          </td>
          <td class="px-6 py-4">
            <span class="inline-block bg-blue-100 px-2 py-1 rounded">{{ item.method || '-' }}</span>
          </td>
          <td scope="row" class="px-6 py-4">
            <a :href="'/block/' + item.block_no"
              class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.block_no }}</a>
          </td>
          <td class="px-6 py-4">
            <div class="inline-block w-40" :title="item.trade_time">{{ item.trade_interval_time | timeAgoForSec }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <svg v-if="item.trade_from_type === 2" class="w-5 h-5 inline-block align-middle" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <div v-if="item.trade_from === queryForm.value" :title="item.trade_from"
              class="inline-block align-middle truncate">{{ item.trade_from | ellipsisAddress }}</div>
            <a v-else :href="'/address/' + item.trade_from" :title="item.trade_from"
              class="inline-block align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_from | ellipsisAddress }}</a>
          </td>

          <td class="px-6 py-4">
            <div v-if="item.trade_from === queryForm.value" class="rounded px-2 py-1 bg-yellow-50 text-yellow-600">OUT
            </div>
            <div v-if="item.trade_to === queryForm.value" class="rounded py-1 px-2 inline bg-green-50  text-green-600">IN
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <svg v-if="item.trade_to_type === 2" class="w-5 h-5 inline-block align-middle" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <div v-if="item.trade_to === queryForm.value" :title="item.trade_to"
              class="inline-block align-middle truncate">{{ item.trade_to | ellipsisAddress }}</div>
            <a v-else :href="'/address/' + item.trade_to" :title="item.trade_to"
              class="inline-block align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_to | ellipsisAddress }}</a>
          </td>
          <td class="px-6 py-4">
            {{ item.trade_amount }} PI
          </td>
          <td class="px-6 py-4">
            {{ item.trade_fee }}
          </td>
        </tr>
      </tbody>
    </table>
    <p @click="viewAllTransaction" v-if="!all && data.counts != ''" class="view-all-text hover:select-all">VIEW ALL
      TRANSACTIONS&nbsp;&rarr;</p>
    <div v-if="all && data.counts != ''" class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length"
        @change="pageChange" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        field: 'trade_address',
        length: '25',
        start: '1',
        value: '',
      },
      data: {
        counts: '',
        contract_trade_count: '',
        trade_list: [],
      },
      filter: 'View Completed Txns'
    }
  },
  computed: {
    all() {
      return this.$route.params.transaction
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr || this.$route.params.transaction;
    if(!this.all){
      this.getContractTradeList()
    }
  },
  mounted() {
    if (window.sessionStorage.getItem('list-type') && !!this.all) {
      this.filter = window.sessionStorage.getItem('list-type') === 'completed' ? 'View Completed Txns' : 'View Pending Txns';
      window.sessionStorage.getItem('list-type') === 'completed' ? this.getContractTradeList() : this.getPendingTradeList()
    }
  },
  methods: {
    async getContractTradeList() {
      try {
        const res = await this.$api.getTradeList(this.queryForm)
        this.data = res.data;
      } catch (error) { }
    },
    async getPendingTradeList() {
      try {
        const res = await this.$api.getPendingTradeList(this.queryForm);
        this.data = res.data;
      } catch (error) { }
    },
    viewAllTransaction() {
      window.sessionStorage.setItem('title-tr', 'Transactions')
      window.location.href = `/transaction/${this.queryForm.value}`
    },
    pageChange(page) {
      this.queryForm.start = String(page.page);
      this.getContractTradeList();
    },
    selectFilter(filter) {
      const element = document.getElementsByClassName('mine-control');
      element[0].classList.add('hidden');
      this.filter = filter;
      window.sessionStorage.setItem('title-tr', 'Transactions')
      window.sessionStorage.setItem('list-type', filter === 'View Completed Txns' ? 'completed' : 'pending');
      !this.all && (window.location.href = `/transaction/${this.queryForm.value}`);
        (!!this.all && filter) === 'View Completed Txns' ? this.getContractTradeList() : this.getPendingTradeList()
    }
  },
}
</script>
<style scoped>
.view-all-text {
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
  color: #e00585;
}
</style>