<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="flex flex-wrap justify-between items-center text-sm font-medium pb-5">
      <div class="text-gray-500 md:mb-0 mb-3">
        <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
        </svg>
        Latest {{ !all ? data.contract_trade_721_count : data.counts }} ERC-721 Token Transfers Events
      </div>
    </div>
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

          </th>
          <th scope="col" class="px-6 py-3">
            To
          </th>
          <th scope="col" class="px-6 py-3">
            Token ID
          </th>
          <th scope="col" class="px-6 py-3">
            Token
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.contract_trade_721_list" :key="item.block_no"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <a :href="'/tx/' + item.trade_hash" :title="item.trade_hash"
              class="inline-block w-36 align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_hash }}</a>
          </th>
          <td class="px-6 py-4">
            <div :title="item.trade_time" class="w-36">{{ item.trade_time_interval | timeAgoForSec }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <svg v-if="item.trade_from_type === 2" class="w-5 h-5 inline-block align-middle" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <div v-if="item.trade_from === queryForm.value" :title="item.trade_from"
              class="inline-block align-middle truncate">{{ item.trade_from | ellipsisAddress }}</div>
            <a v-else :href="'/address/' + item.trade_from" :title="item.trade_from"
              class="inline-block align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_from | ellipsisAddress }}</a>
          </td>

          <td class="px-6 py-4">
            <div v-if="item.trade_from === queryForm.value" class="rounded px-2 py-1 bg-yellow-50 text-yellow-600">OUT
            </div>
            <div v-if="item.trade_to === queryForm.value" class="rounded py-1 px-2 inline bg-green-50  text-green-600">IN
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <svg v-if="item.trade_to_type === 2" class="w-5 h-5 inline-block align-middle" fill="none"
              stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <div v-if="item.trade_to === queryForm.value" :title="item.trade_to"
              class="inline-block align-middle truncate">{{ item.trade_to | ellipsisAddress }}</div>
            <a v-else :href="'/address/' + item.trade_to" :title="item.trade_to"
              class="inline-block align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{
                item.trade_to | ellipsisAddress }}</a>
          </td>
          <td class="px-6 py-4">
            {{ item.token_id | hexToNumber }}
          </td>
          <td class="px-6 py-4">
            {{ item.token_name }}
          </td>
        </tr>
      </tbody>
    </table>
    <p @click="viewAllTransaction" v-if="!all && data.counts != ''" class="view-all-text hover:select-all">VIEW ALL
      TRANSACTIONS&nbsp;&rarr;</p>
    <div v-if="all && data.counts != ''" class="flex flex-wrap justify-end text-sm font-medium px-4 py-5 text-center">
      <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length"
        @change="pageChange" />
    </div>
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
        contract_trade_721_count: '',
        contract_trade_721_list: [],
      },
    }
  },
  computed: {
    all() {
      return this.$route.params.transaction
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr || this.$route.params.transaction
    this.getContractTrade721List()
  },
  methods: {
    async getContractTrade721List() {
      try {
        const res = await this.$api.getContractTrade721List(this.queryForm)
        this.data = res.data
      } catch (error) { }
    },
    viewAllTransaction() {
      window.sessionStorage.setItem('title-tr', 'ERC-721 Token Txns')
      window.location.href = `/transaction/${this.queryForm.value}`
    },
    pageChange(page) {
      this.queryForm.start = String(page.page);
      this.getContractTrade721List();
    },
  },
}
</script>
<style scoped>
.view-all-text {
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
  color: #e00585;
}
</style>