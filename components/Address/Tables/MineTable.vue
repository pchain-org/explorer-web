<template>

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
            {{ item.block_no }}
          </th>
          <td class="px-6 py-4">
            {{ item.block_time }}
          </td>
          <td class="px-6 py-4">
            {{ item.block_trade_amount }}
          </td>
          <td class="px-6 py-4">
            {{ item.gas_used }}
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