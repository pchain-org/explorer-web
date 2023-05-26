<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3 border-b">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Contracts</span>
          <span class="mr-2 text-gray-500 text-sm">With verified source codes only</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3">Total of {{ data.counts }} verified contracts source code</span>
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Contract Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Compiler
                </th>
                <th scope="col" class="px-6 py-3">
                  Version
                </th>
                <th scope="col" class="px-6 py-3">
                  Balance
                </th>
                <th scope="col" class="px-6 py-3">
                  Txns
                </th>
                <th scope="col" class="px-6 py-3">
                  Setting
                </th>
                <th scope="col" class="px-6 py-3">
                  Verified
                </th>
                <th scope="col" class="px-6 py-3">
                  Audited
                </th>
                <th scope="col" class="px-6 py-3">
                  License
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.contracts_verified_list" :key="item.block_no" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <a :href="'/address/' + item.address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.address | ellipsisAddress }}</a>
                </td>
                <td scope="row" class="px-6 py-4">
                  <div :title="item.contract_name" class="inline-block w-36 truncate">{{ item.contract_name }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.compiler || '-' }}
                </td>
                <td class="px-6 py-4">
                  <div :title="item.version" class="inline-block w-36 truncate">{{ item.version }}</div>
                </td>
                <td class="px-6 py-4">
                  <div :title="item.balance" class="inline-block w-36 truncate">{{ item.balance }}PI</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.trade_amount }}
                </td>
                <td class="px-6 py-4">
                  <div v-if="item.setting_optimization_enabled === 1 " title="Optimization Enabled">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 fill-current text-gray-400 hover:text-black">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div v-else>-</div>
                </td>
                <td class="px-6 py-4">
                  <div class="w-40">{{ item.verified }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.audited || '-' }}
                </td>
                <td class="px-6 py-4">
                  <div :title="item.license" class="inline-block w-36 truncate">{{ item.license || '-' }}</div>
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
        contracts_verified_count: '',
        counts: '',
        contracts_verified_list: [],
      },
    }
  },
  created() {
    this.getContractsVerifiedList()
  },
  methods: {
    async getContractsVerifiedList() {
      try {
        const res = await this.$api.getContractsVerifiedList(this.queryForm)
        this.data = res.data
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.getContractsVerifiedList()
    },
  },
}
</script>