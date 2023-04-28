<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4 mt-6">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Pending Transactions</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3"> A total of {{ data.counts }} pending txns found</span>
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Txn Hash
                </th>
                <th scope="col" class="px-6 py-3">
                  Nonce
                </th>
                <th scope="col" class="px-6 py-3">
                  Method
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Seen
                </th>
                <th scope="col" class="px-6 py-3">
                  Gas Limit
                </th>
                <th scope="col" class="px-6 py-3">
                  Gas Price
                </th>
                <th scope="col" class="px-6 py-3">
                  From
                </th>
                <th scope="col" class="px-6 py-3">
                  To
                </th>
                <th scope="col" class="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.pending_trade_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4">
                  <a :href="'/tx/' + item.block_hash" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_hash }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-36">{{ item.nonce }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-block bg-blue-100 px-2 py-1 rounded">{{ item.method }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="w-24 cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.trade_time">
                    {{ item.trade_time_interval | timeAgoForSec }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ item.gas }}
                </td>
                <td class="px-6 py-4">
                  {{ item.gas_price }}
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.from" :title="item.from" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.from }}</a>
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.to" :title="item.to" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.to }}</a>
                </td>
                <td class="px-6 py-4">
                  {{ item.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>
      </div>

    </div>

    <!-- Show tooltip on bottom -->
    <div id="age-tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {{ tooltipContent | timestampToTime }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
<script>
import { initTooltips } from 'flowbite'

export default {
  data() {
    return {
      queryForm: {
        field: '',
        length: '25',
        start: '1',
        types: '',
        value: '',
      },
      data: {
        counts: '',
        pending_trade_list: [],
      },
      tooltipContent: '',
    }
  },
  created() {
    this.getPendingTradeList()
  },
  methods: {
    async getPendingTradeList() {
      try {
        const res = await this.$api.getPendingTradeList(this.queryForm)
        this.data = res.data
        this.$nextTick(initTooltips)
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getPendingTradeList()
    },
  },
}
</script>