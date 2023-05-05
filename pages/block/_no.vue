<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Block</span>
          <span class="ml-2 text-gray-500">#{{ detail.block_no }}</span>
        </h1>
      </div>
    </div>

    <div class="container mx-auto px-4 ">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class=" border-b border-gray-200 dark:border-gray-700">
          <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button id="overview-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="false">Overview</button>
            </li>
          </ul>
        </div>

        <div id="myTabContent">
          <div id="overview" class="p-4 rounded-lg break-words" role="tabpanel" aria-labelledby="overview-tab">
            <div class="text-sm">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Block Height:</div>
                <div class="col-span-8">
                  <span class="mr-2">{{ detail.block_no }}</span>
                  <a :href="'/block/' + (+ detail.block_no - 1)" class="inline-block p-1 rounded bg-blue-100 truncate align-bottom mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-600 dark:text-blue-500 w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </a>

                  <a :href="'/block/' + (+ detail.block_no + 1)" class="inline-block p-1 rounded bg-blue-100 truncate align-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-600 dark:text-blue-500 w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>

                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0">Timestamp:</div>
                <div class="col-span-8">{{ detail.block_time | timeAgo }} ({{ detail.block_time }})</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Transactions:</div>
                <div class="col-span-8">
                  <span>{{ detail.trade_amount }} transactions</span>
                  and
                  <span>{{ detail.trade_contract_amount }} contract internal transaction</span>
                  in this block
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Validated by:</div>
                <div class="col-span-8">
                  <a :href="'/address/' + detail.miner" class="truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.miner }}</a>
                  <span class="inline-block ml-1">in {{ detail.time_stamp_interval }} secs</span>
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Block Reward:</div>
                <div class="col-span-8">{{ detail.block_reward }} PI</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Difficulty:</div>
                <div class="col-span-8">{{ detail.difficulty }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-4">Total Difficulty:</div>
                <div class="col-span-8">{{ detail.total_difficulty | toThousandFilter(null) }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Size:</div>
                <div class="col-span-8">{{ detail.size | toThousandFilter(null) }} bytes</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Gas Used:</div>
                <div class="col-span-8">{{ detail.gas_used | toThousandFilter(null) }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Gas Limit:</div>
                <div class="col-span-8">{{ detail.gas_limit | toThousandFilter(null) }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Extra Data:</div>
                <div class="col-span-8">
                  <textarea id="message" :value="detail.extra_data" readonly rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div :class="[isShowMore?'max-h-screen':'max-h-0']" class="transition-all duration-500 overflow-hidden">
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Hash:</div>
                  <div class="col-span-8">{{ detail.hash }}</div>
                </div>
                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Parent Hash:</div>
                  <div class="col-span-8">
                    {{ detail.parent_hash }}
                  </div>
                </div>
                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Sha3Uncles:</div>
                  <div class="col-span-8">
                    {{ detail.sha3_uncles }}
                  </div>
                </div>

                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">

                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Nonce:</div>
                  <div class="col-span-8">
                    {{ detail.nonce }}
                  </div>
                </div>
              </div>

              <div class="cursor-pointer text-blue-500" @click="isShowMore=!isShowMore">
                {{ isShowMore ? 'Click to see Less' : 'Click to see More' }}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
import { Tabs } from 'flowbite'
export default {
  components: {},
  data() {
    return {
      queryForm: {
        field: 'block_no',
        value: '',
      },
      activeTab: 'Logs',
      tabs: null,
      detail: {},
      isShowMore: false,
    }
  },
  created() {
    this.queryForm.value = this.$route.params.no
    this.getBlockDetail()
  },
  mounted() {
    this.initTabs()
  },
  methods: {
    async getBlockDetail() {
      const res = await this.$api.getBlockDetail(this.queryForm)
      this.detail = res.data || {}
    },
    initTabs() {
      // create an array of objects with the id, trigger element (eg. button), and the content element
      const tabElements = [
        {
          id: 'Overview',
          triggerEl: document.querySelector('#overview-tab'),
          targetEl: document.querySelector('#overview'),
        },
      ]

      // options with default values
      const options = {
        defaultTabId: 'Overview',
        activeClasses:
          'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
        inactiveClasses:
          'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
        onShow: (val) => {
          this.activeTab = val._activeTab.id
        },
      }
      this.tabs = new Tabs(tabElements, options)
    },
  },
}
</script>