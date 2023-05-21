<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Top Accounts by PI Balance</span>
        </h1>
      </div>

      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <div class="rounded bg-white p-4">
          <div class="font-medium mb-3 text-blue-500">Max Supply</div>
          <div>{{ data.max_supply | toThousandFilter(null) }}</div>
        </div>
        <div class="rounded bg-white p-4">
          <div class="font-medium mb-3 text-blue-500">Total Supply</div>
          <div class="font-normal">{{ data.total_supply | toThousandFilter(null) }}</div>
        </div>
        <div class="rounded bg-white p-4">
          <div class="font-medium mb-3 text-blue-500">Circulating Supply</div>
          <div>{{ data.circulating_supply | toThousandFilter(null) }}</div>
        </div>
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
                  Unstaked
                  <svg fill="none" class="inline-block ml-1 w-4 cursor-pointer align-top" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="top" @mouseenter="tooltipContent='available balance'">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </th>
                <th scope="col" class="px-6 py-3">
                  Percentage
                </th>

                <th scope="col" class="px-6 py-3">
                  Total PI
                  <svg fill="none" class="inline-block ml-1 w-4 cursor-pointer align-top" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="top" @mouseenter="tooltipContent='Staked + Unstaked'">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </th>
                <th scope="col" class="px-6 py-3">
                  Staked
                  <svg fill="none" class="inline-block ml-1 w-4 cursor-pointer align-top" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="top" @mouseenter="tooltipContent='total_delegateBalance + total_depositBalance + total_rewardBalance'">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </th>
                <th scope="col" class="px-6 py-3">
                  First Stake Time
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Stake Time
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <svg v-if="item.account_type === 2" class="w-5 h-5 inline-block align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <a :href="'/address/' + item.account_address" :title="item.account_address" class="inline-block w-36 align-middle truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.account_address }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="w-36">{{ item.name_tag || '-' }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="">{{ item.balance }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.percentage }}%
                </td>
                <td class="px-6 py-4">
                  {{ item.total_balance }}
                </td>
                <td class="px-6 py-4">
                  {{ item.stake_balance }}
                </td>
                <td class="px-6 py-4">
                  <div v-if="item.first_stake_time" class="w-36" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.first_stake_time">{{ item.first_stake_age | timeAgoForSec }}</div>
                  <div v-else>-</div>
                </td>
                <td class="px-6 py-4">
                  <div v-if="item.last_stake_age" class="w-36" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.last_stake_time">{{ item.last_stake_age | timeAgoForSec }}</div>
                  <div v-else>-</div>
                </td>
                <td class="px-6 py-4">
                  <div class="w-36 truncate">{{ item.trade_count }}</div>
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

    <!-- Show tooltip on bottom -->
    <div id="age-tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {{ tooltipContent }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
<script>
import { initTooltips } from 'flowbite'
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
        circulating_supply: 0,
        max_supply: 0,
        total_supply: 0,
      },
      tooltipContent: '',
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
        this.$nextTick(() => {
          initTooltips()
        })
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