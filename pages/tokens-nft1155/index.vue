<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Multi-Token Token Tracker</span>
          <span class="bg-gray-200 rounded px-2 py-1 text-gray-600 text-sm">ERC-1155</span>
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
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Token
                </th>
                <th scope="col" class="px-6 py-3">
                  Transfers (24H)
                </th>
                <th scope="col" class="px-6 py-3">
                  Transfers (7D)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.trade_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                  {{ item.order_no }}
                </td>
                <td scope="row" class="px-6 py-4">
                  <div class="w-36 flex">
                    <img v-if="item.token_image" :src="item.token_image" alt="img" class="w-4 h-4 rounded-full mr-3">
                    <div class="flex-1">
                      <a :href="'/token/' + item.token_address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.token_name }}</a>
                      <div class="text-sm">{{ item.token_description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ item.transfers_24h }}
                </td>
                <td class="px-6 py-4">
                  {{ item.transfers_seven_day }}
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
        counts: '',
        trade_counts: '',
        trade_list: [],
      },
    }
  },
  created() {
    this.getTokenMultiList()
  },
  methods: {
    async getTokenMultiList() {
      try {
        const res = await this.$api.getTokenMultiList(this.queryForm)
        this.data = res.data || {}
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTokenMultiList()
    },
  },
}
</script>