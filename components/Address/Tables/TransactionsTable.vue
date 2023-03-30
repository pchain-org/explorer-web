<template>

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
          <th scope="col" class="px-6 py-3">
            [Txn Fee]
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.contract_trade_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <a :href="'/tx/' + item.trade_hash" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_hash }}</a>
          </td>
          <td class="px-6 py-4">
            -
          </td>
          <td scope="row" class="px-6 py-4">
            <a :href="'/block/' + item.block_no" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_no }}</a>
          </td>
          <td class="px-6 py-4">
            <div class="inline-block w-40">{{ item.trade_time }}</div>
          </td>
          <td class="px-6 py-4">
            <div v-if="item.trade_from === queryForm.value" :title="item.trade_from" class="inline-block w-36 truncate">{{ item.trade_from }}</div>
            <a v-else :href="'/address/' + item.trade_from" :title="item.trade_from" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_from }}</a>
          </td>
          <td class="px-6 py-4">
            <div v-if="item.trade_to === queryForm.value" :title="item.trade_to" class="inline-block w-36 truncate">{{ item.trade_to }}</div>
            <a v-else :href="'/address/' + item.trade_to" :title="item.trade_to" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.trade_to }}</a>
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
    this.getContractTradeList()
  },
  methods: {
    async getContractTradeList() {
      try {
        const res = await this.$api.getContractTradeList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
  },
}
</script>