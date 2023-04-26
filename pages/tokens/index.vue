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
          ERC-20 Tokens By MarketCapitalization
        </div>

        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3">Total of {{ data.counts }} Token Contracts</span>
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
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Change (%)
                </th>
                <th scope="col" class="px-6 py-3">
                  Volume (24H)
                </th>
                <!-- <th scope="col" class="px-6 py-3">
                  Circulating Market Cap
                </th>
                <th scope="col" class="px-6 py-3">
                  On-Chain Market Cap
                </th> -->
                <th scope="col" class="px-6 py-3">
                  Holders
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.token_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                  {{ item.order_no }}
                </td>
                <td scope="row" class="px-6 py-4">
                  <div class="w-36 flex">
                    <img v-if="item.token_image" :src="item.token_image" alt="" class="w-4 h-4 rounded-full mr-3">
                    <div class="flex-1">
                      <a :href="'/token/' + item.token_address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.token_name }}</a>
                      <div class="text-sm">{{ item.token_description }}</div>
                      <div class="inline-block text-xs px-2 py-1 rounded bg-gray-200 text-gray-500">{{ item.token_types }}</div>
                    </div>
                  </div>
                </td>
                <td scope="row" class="px-6 py-4">
                  <div class="w-48">
                    <div>{{ item.price_dollar }} $</div>
                    <div class="text-xs">{{ item.price_btc }} BTC</div>
                    <div class="text-xs">{{ item.price_pi }} PI</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="">{{ item.change }}</div>
                </td>

                <td class="px-6 py-4">
                  $ {{ item.volume_24h }}
                </td>
                <!-- <td class="px-6 py-4">
                  $ {{ item.market_cap }}
                </td>

                <td class="px-6 py-4">
                  $ {{ item.on_chain || '-' }}
                </td> -->

                <td class="px-6 py-4">
                  <div> {{ item.holders }}</div>
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
        token_list: [],
      },
    }
  },
  created() {
    this.getTokenListByMarketCap()
  },
  methods: {
    async getTokenListByMarketCap() {
      try {
        const res = await this.$api.getTokenListByMarketCap(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTokenListByMarketCap()
    },
  },
}
</script>