<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4 mt-6">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Blocks</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3">(Total of {{ data.counts }} blocks)</span>
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
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
                  Txn
                </th>
                <th scope="col" class="px-6 py-3">
                  Validator
                </th>
                <th scope="col" class="px-6 py-3">
                  Gas Used
                </th>
                <th scope="col" class="px-6 py-3">
                  Gas Limit
                </th>
                <th scope="col" class="px-6 py-3">
                  Reward
                </th>
                <!-- <th scope="col" class="px-6 py-3">
                  Fees Burnt
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.block_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4">
                  <a :href="'/block/' + item.block_no" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_no }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-40">{{ item.block_time }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.block_trade_amount }}
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.block_miner" :title="item.block_miner" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_miner }}</a>
                </td>
                <td class="px-6 py-4">
                  <div class="">{{ item.gas_used }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.gas_limit }}
                </td>
                <td class="px-6 py-4">
                  {{ item.block_reward }} PI
                </td>
                <!-- <td class="px-6 py-4">
                  -
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
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
        counts: '0',
        block_list: [],
      },
    }
  },
  created() {
    this.getBlockList()
  },
  methods: {
    async getBlockList() {
      try {
        const res = await this.$api.getBlockList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getBlockList()
    },
  },
}
</script>