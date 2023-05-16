<template>

  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 pb-5">
      <div class="text-gray-500 md:mb-0 mb-3">
        <div>More than {{ data.token_transactions_counts }} transactions found</div>
        <div class="text-xs">(Showing the last {{ data.counts }} records)</div>
      </div>
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
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
          <th v-if="tokenType !== 1" scope="col" class="px-6 py-3">
            TokenID
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.token_transactions_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <a :href="'/tx/' + item.trade_hash" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_hash }}</a>
          </td>
          <td class="px-6 py-4">
            <span class="inline-block bg-blue-100 px-2 py-1 rounded">{{ item.method || '-' }}</span>
          </td>
          <td class="px-6 py-4">
            <div class="inline-block w-40">{{ item.trade_time | timeAgo }}</div>
          </td>
          <td class="px-6 py-4">
            <div v-if="item.trade_from === queryForm.value" :title="item.trade_from" class="inline-block w-36 truncate">{{ item.trade_from }}</div>
            <a v-else :href="'/address/' + item.trade_from" :title="item.trade_from" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_from }}</a>
          </td>
          <td class="px-6 py-4">
            <span class="bg-green-100 rounded-2xl w-5 h-5 flex justify-center items-center">
              <svg class="inline-block w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </td>

          <td class="px-6 py-4">
            <div v-if="item.trade_to === queryForm.value" :title="item.trade_to" class="inline-block w-36 truncate">{{ item.trade_to }}</div>
            <a v-else :href="'/address/' + item.trade_to" :title="item.trade_to" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_to }}</a>
          </td>
          <td v-if="tokenType !== 1" class="px-6 py-4">
            {{ item.token_id | hexToNumber }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
    </div>
  </div>

</template>
<script>
export default {
  props: {
    tokenType: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      queryForm: {
        field: '',
        length: '20',
        start: '1',
        token_address: '',
        token_id: '',
        token_types: '',
        value: '',
      },
      data: {
        counts: '',
        token_transactions_counts: '',
        token_transactions_list: [],
      },
    }
  },
  watch: {
    tokenType: {
      handler(val) {
        this.queryForm.token_types = this.tokenType
        this.queryForm.token_address = this.$route.params.addr
        if (val !== '') {
          this.getContractTradeList()
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    async getContractTradeList() {
      try {
        const res = await this.$api.getTokenTransactions(this.queryForm)
        this.data = res.data || {}
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getContractTradeList()
    },
  },
}
</script>