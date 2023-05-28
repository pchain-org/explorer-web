<template>

  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium pb-5">
      <div class="text-gray-500 md:mb-0 mb-3">
        <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
        </svg>
        Latest {{ queryForm.length }} (From a total of {{ data.counts | toThousandFilter(null) }} blocks)
        <!-- 无数据，展示隐藏 -->
        <!-- with {{ data.validated_block_pi | toThousandFilter }} PI in fees) -->
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Block
          </th>
          <th scope="col" class="px-6 py-3">
            Age
          </th>
          <th scope="col" class="px-6 py-3">
            Transaction
          </th>
          <th scope="col" class="px-6 py-3">
            Gas Used
          </th>
          <th scope="col" class="px-6 py-3">
            Reward
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.validated_block_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <a :href="'/block/' + item.block_no" :title="item.block_no" class="inline-block w-28 align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_no }}</a>
          </th>
          <td class="px-6 py-4">
            <div class="w-36" :title="item.block_time">{{ item.block_time_interval | timeAgoForSec }}</div>
          </td>
          <td class="px-6 py-4">
            {{ item.block_trade_amount }}
          </td>
          <td class="px-6 py-4">
            <div class="mb-1">{{ item.gas_used }} ({{ (item.gas_used / item.gas_limit * 100).toFixed(2)  }} %)</div>
            <div class="w-full bg-gray-200 rounded-full h-0.5 mb-4 dark:bg-gray-700">
              <div class="bg-blue-600 h-0.5 rounded-full dark:bg-blue-500" :style="{width: (item.gas_used / item.gas_limit * 100).toFixed(2) + '%'}"></div>
            </div>
          </td>
          <td class="px-6 py-4">
            {{ item.block_reward }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        field: 'address',
        length: '25',
        start: '1',
        value: '',
      },
      data: {
        counts: '',
        validated_block_count: '',
        validated_block_pi: '',
        validated_block_list: [],
      },
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr
    this.getValidatedBlockList()
  },
  methods: {
    async getValidatedBlockList() {
      try {
        const res = await this.$api.getValidatedBlockList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
  },
}
</script>