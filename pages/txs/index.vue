<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4 mt-6">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Transactions</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <div class="text-gray-500 md:mb-0 mb-3">
            <div>More than > {{ data.trade_counts }} transactions found</div>
            <div class="text-xs">(Showing the last {{ data.counts }} records)</div>
          </div>
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
                  To
                </th>
                <th scope="col" class="px-6 py-3">
                  Value
                </th>
                <th scope="col" class="px-6 py-3" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom">
                  Txn Fee
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.trade_list" :key="item.trade_interval_time" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4">
                  <a :href="'/tx/' + item.trade_hash" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_hash }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-36">{{ item.method || '-' }}</div>
                </td>
                <td class="px-6 py-4">
                  <a :href="'/block/' + item.block_no" :title="item.block_no" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_no }}</a>
                </td>

                <td class="px-6 py-4">
                  <div class="w-24 cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.trade_time">
                    {{ item.trade_interval_time | timeAgoForSec }}
                  </div>
                </td>

                <td class="px-6 py-4">
                  <a :href="'/address/' + item.trade_from" :title="item.trade_from" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_from }}</a>
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.trade_to" :title="item.trade_to" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_to }}</a>
                </td>

                <td class="px-6 py-4">
                  <div class="w-36">{{ item.trade_amount }} PI</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.trade_fee }}
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
      {{ tooltipContent }}
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
        trade_counts: '',
        trade_list: [],
      },
      tooltipContent: '',
    }
  },
  mounted() {
    this.getTradeList()
  },
  methods: {
    async getTradeList() {
      try {
        const res = await this.$api.getTradeList(this.queryForm)
        this.data = res.data
        this.$nextTick(() => {
          initTooltips()
        })
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTradeList()
    },
  },
}
</script>