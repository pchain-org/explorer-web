<template>

  <div class="relative overflow-x-auto sm:rounded-lg">

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Rank
          </th>
          <th scope="col" class="px-6 py-3">
            Address
          </th>
          <th scope="col" class="px-6 py-3">
            Quantity
          </th>
          <th scope="col" class="px-6 py-3">
            Percentage
          </th>
          <th scope="col" class="px-6 py-3">
            Value
          </th>
          <th scope="col" class="px-6 py-3">
            Analytics
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.token_holder_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {{ item.order_no }}
          </td>
          <td class="px-6 py-4">
            <a :href="`/token/${$route.addr}?a=${item.holder_address}`" :title="item.holder_address" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.holder_address }}</a>
          </td>

          <td class="px-6 py-4">
            <div class="inline-block">{{ item.quantity | toThousandFilter(null) }}</div>
          </td>

          <td class="px-6 py-4">
            {{ item.percentage }}
          </td>

          <td class="px-6 py-4">
            {{ item.trade_fee }}
          </td>

          <td class="px-6 py-4">
            -
          </td>

        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
export default {
  name: 'ReadContract',
  props: {
    tokenType: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      queryForm: {
        contract_address: '',
      },
      data: {},
    }
  },
  created() {
    this.queryForm.contract_address = this.$route.params.addr
    this.contractReadFuncQueryByAddress()
  },
  methods: {
    async contractReadFuncQueryByAddress() {
      try {
        const res = await this.$api.contractReadFuncQueryByAddress(
          this.queryForm
        )
        this.data = res.data || {}
      } catch (error) {}
    },
  },
}
</script>