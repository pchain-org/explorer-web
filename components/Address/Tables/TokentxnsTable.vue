<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Txn Hash
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
          <th scope="col" class="px-6 py-3">
            Token
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.contract_trade_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ item.parent_trade_hash }}
          </th>
          <td class="px-6 py-4">
            {{ item.trade_time }}
          </td>
          <td class="px-6 py-4">
            {{ item.trade_from }}
          </td>
          <td class="px-6 py-4">
            {{ item.trade_to }}
          </td>
          <td class="px-6 py-4">
            {{ item.value }}
          </td>
          <td class="px-6 py-4">
            {{ item.value }}
          </td>
          <td class="px-6 py-4">
            {{ item.token_name }}
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
        contract_trade_count: '',
        contract_trade_list: [],
      },
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr
    this.getContractTradeTokenList()
  },
  methods: {
    async getContractTradeTokenList() {
      try {
        const res = await this.$api.getContractTradeTokenList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
  },
}
</script>