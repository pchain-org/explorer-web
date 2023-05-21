<template>

  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 pb-5">
      <div class="text-gray-500 md:mb-0 mb-3">
        <div>More than {{ data.token_holder_counts }}transactions found</div>
      </div>
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
    </div>
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
          <th v-if="tokenType === 1" scope="col" class="px-6 py-3">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.token_holder_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {{ item.order_no }}
          </td>
          <td class="px-6 py-4">
            <div v-if="item.holder_type === 2">
              <svg class="w-5 h-5 inline-block align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <a :href="`/token/${$route.params.addr}?a=${item.holder_address}`" :title="item.holder_address" class="inline-block align-middle w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">
                {{ item.token_name || item.holder_address }}
              </a>
            </div>
            <a v-else :href="`/token/${$route.params.addr}?a=${item.holder_address}`" :title="item.holder_address" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">
              {{ item.holder_address }}
            </a>
          </td>

          <td class="px-6 py-4">
            <div class="inline-block">{{ item.quantity | toThousandFilter(null) }}</div>
          </td>

          <td class="px-6 py-4">
            {{ item.percentage }}
          </td>
          <td v-if="tokenType === 1" class="px-6 py-4">
            ${{ item.value }}
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
        token_holder_counts: '',
        token_holder_list: [],
      },
    }
  },
  watch: {
    tokenType: {
      handler(val) {
        this.queryForm.token_types = this.tokenType
        this.queryForm.token_address = this.$route.params.addr
        if (val !== '') {
          this.getTokenHolder()
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    async getTokenHolder() {
      try {
        const res = await this.$api.getTokenHolder(this.queryForm)
        this.data = res.data || {}
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getTokenHolder()
    },
  },
}
</script>