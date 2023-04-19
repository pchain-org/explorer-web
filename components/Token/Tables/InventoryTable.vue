<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 pb-5">
      <div class="text-gray-500 md:mb-0 mb-3">
        <div> Latest {{ data.token_inventory_counts }} active tokens (From a total of {{ data.counts }} tokens)</div>
      </div>
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Token_id
          </th>
          <th scope="col" class="px-6 py-3">
            Owner
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.token_inventory_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <a :href="`/token/${$route.params.addr}?a=${item.token_id}`" class="truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.token_id }}</a>
          </td>
          <td class="px-6 py-4">
            <a :href="`/token/${$route.params.addr}?a=${item.holders_address}`" :title="item.holders_address" class="truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.holders_address }}</a>
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
        token_inventory_counts: '',
        token_inventory_list: [],
      },
    }
  },
  watch: {
    tokenType: {
      handler(val) {
        this.queryForm.token_types = this.tokenType
        this.queryForm.token_address = this.$route.params.addr
        if (val !== '') {
          this.getTokenInventory()
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    async getTokenInventory() {
      try {
        const res = await this.$api.getTokenInventory(this.queryForm)
        this.data = res.data || {}
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTokenInventory()
    },
  },
}
</script>