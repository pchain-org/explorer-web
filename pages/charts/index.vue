<template>
  <div class="relative pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap text-gray-900 dark:text-white">
          <span class="text-xl mr-2">PI Smart Chain Charts & Statistics</span>
        </h1>
      </div>

      <div id="blockchainData" class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          Blockchain Data
        </div>
        <div class="p-4">
          <div class="grid md:grid-cols-4 lg:grid-8">
            <div class="mb-3 shadow rounded">
              <div class="w-full h-full">
                <div class="border-b p-3 text-sm">
                  <a href="/chart/tx" class="inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline">Daily Transactions Chart</a>
                </div>
                <a class="p-3 block" href="/chart/tx">
                  <img class="w-full" src="https://bscscan.com/images/charts/transactionhistory.svg?v=0.0.5" alt="Daily Transactions Chart">
                </a>
              </div>
            </div>
            <div class="mb-3 shadow rounded ml-3">
              <div class="w-full h-full">
                <div class="border-b p-3 text-sm">
                  <a href="/chart" class="inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline">Daily Price USD Chart</a>
                </div>
                <a class="p-3 block" href="/chart">
                  <img class="w-full" src="https://bscscan.com/images/charts/tokenerc-20txns.svg?v=0.0.5.7" alt="Daily Price USD Chart">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="validatorsData" class="w-full mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          Validators Data
        </div>
        <div class="p-4">
          <div class="grid md:grid-cols-4 lg:grid-8">
            <div id="topstats" class="mb-3 shadow rounded">
              <div class="w-full h-full">
                <div class="border-b p-3 text-sm">
                  <a href="/stat/miner" class="inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline">Top Validators By Blocks</a>
                </div>
                <a class="p-3 block" href="/stat/miner">
                  <img class="w-full" src="https://bscscan.com/images/charts/validators.svg?v=0.0.5" alt="Top Validators By Blocks">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="chainNum === '1'" id="contractsData" class="w-full mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          Contracts Data
        </div>
        <div class="p-4">
          <div class="grid md:grid-cols-4 lg:grid-8">
            <div class="mb-3 shadow rounded">
              <div class="w-full h-full">
                <div class="border-b p-3 text-sm">
                  <a href="/chart/verified-contracts" class="inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline">Verified Contracts Chart</a>
                </div>
                <a class="p-3 block" href="/chart/verified-contracts">
                  <img class="w-full" src="https://bscscan.com/images/charts/verified-contracts.svg?v=0.0.5.11" alt="Verified Contracts Chart">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
import { getChainNum } from '@/utils/chain'
export default {
  data() {
    return {
      chainNum: getChainNum(),
    }
  },
  mounted() {},

  methods: {},
}
</script>
