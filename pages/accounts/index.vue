<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4 mt-6">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Top Accounts by PI Balance</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <div class="text-gray-500 md:mb-0 mb-3">
            <div>A Total of > {{ data.counts }} accounts found</div>
            <div class="text-xs">(Showing the last {{ data.account_count }} top accounts only)</div>
          </div>
          <Pagination :total="+data.account_count" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>
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
                  Name Tag
                </th>
                <th scope="col" class="px-6 py-3">
                  Balance
                </th>
                <th scope="col" class="px-6 py-3">
                  Percentage
                </th>
                <th scope="col" class="px-6 py-3">
                  Txn Count
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.account_list" :key="item.order_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                  {{ item.order_no }}
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.account_address" :title="item.account_address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.account_address }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-36">{{ item.name_tag }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.balance }} PI
                </td>
                <td class="px-6 py-4">
                  {{ item.percentage }} %
                </td>
                <td class="px-6 py-4">
                  {{ item.trade_count }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
          <Pagination :total="+data.account_count" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
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
        length: '25',
        start: '1',
      },
      data: {
        account_count: '',
        account_list: [],
      },
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    async getAccountList() {
      try {
        const res = await this.$api.getAccountList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getAccountList()
    },
  },
}
</script>