<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Token Tracker</span>
          <span class="bg-gray-200 rounded px-2 py-1 text-gray-600 text-sm">ERC-20</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5 border-b">
          ERC-20 Tokens By On-Chain Volume (Overall)
        </div>

        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3">(Total of {{ data.counts }} ERC-20 Tokens By Volume)</span>
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
                  Transfer Volume
                </th>
                <th scope="col" class="px-6 py-3">
                  Transfer Amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Unique Senders
                </th>
                <th scope="col" class="px-6 py-3">
                  Unique Receivers
                </th>
                <th scope="col" class="px-6 py-3">
                  Transfer Count
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.token_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4">
                  {{ item.order_no }}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-40 flex items-center">
                    <img v-if="item.token_image" :src="item.token_image" alt="" class="h-4 inline-block mr-3">
                    <img v-else src="@/static/logo_gray.png" alt="" class="h-4 mr-3 inline-block">
                    <a :href="'/token/' + item.token_address" :title="item.token_address" class="flex-1 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.token_name }}</a>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{ item.trade_volume }}
                </td>
                <td class="px-6 py-4">
                  {{ item.trade_amount }}
                </td>
                <td class="px-6 py-4">
                  {{ item.unique_senders }}
                </td>
                <td class="px-6 py-4">
                  {{ item.unique_receivers }}
                </td>
                <td class="px-6 py-4">
                  <div class="">{{ item.trade_count }}</div>
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
        counts: '0',
        token_contracts_counts: '0',
        token_list: [],
      },
    }
  },
  created() {
    this.getTokenListByVolume()
  },
  methods: {
    async getTokenListByVolume() {
      try {
        const res = await this.$api.getTokenListByVolume(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTokenListByVolume()
    },
  },
}
</script>