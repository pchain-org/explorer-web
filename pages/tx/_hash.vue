<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <!-- detail -->
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Transaction Details</span>
        </h1>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class=" border-b border-gray-200 dark:border-gray-700">
          <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button id="overview-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="false">Overview</button>
            </li>
            <li class="mr-2" role="presentation">
              <button id="logs-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#logs" type="button" role="tab" aria-controls="logs" aria-selected="false">Logs ({{ logs.counts }})</button>
            </li>
          </ul>
        </div>

        <div id="myTabContent">
          <div id="overview" class="p-4 rounded-lg break-words" role="tabpanel" aria-labelledby="overview-tab">
            <div class="text-sm">
              <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Transaction Hash:</div>
                <div class="col-span-8">
                  <span class="mr-2">{{ detail.trade_hash }}</span>
                  <ClipboardIcon :text="detail.trade_hash" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Status:</div>
                <div class="col-span-8">{{ detail.status }}</div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Block:</div>
                <div class="col-span-8">
                  <a :href="'/block/' + detail.block_no" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.block_no }}</a>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Timestamp:</div>
                <div class="col-span-8">{{ detail.time_stamp_interval * 1000 | time }}({{ detail.time_stamp | timestampToTime }})</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 md:mb-0 font-medium mb-4">From:</div>
                <div class="col-span-8 truncate">
                  <a :href="'/address/' + detail.trade_from" class="inline truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ detail.trade_from }}</a>
                  <ClipboardIcon :text="detail.trade_from" />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">{{ detail.trade_to_contract ? 'Interacted With (To):' : 'To' }}</div>
                <div class="col-span-8 truncate">{{ detail.trade_to_contract ? 'Contract' : '' }}
                  <a :href="'/address/' + detail.trade_to" class="inline align-bottom truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ detail.trade_to }}</a>
                  <ClipboardIcon :text="detail.trade_to" />
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">
                  Tokens Transferred:
                  <div v-if="detail.tokens_transferred_721.length" class="text-xs">({{ detail.tokens_transferred_721.length }} ERC-721 Transfers found)</div>
                  <div v-if="detail.tokens_transferred.length" class="text-xs">({{ detail.tokens_transferred.length }} ERC-20 Transfers found)</div>
                </div>
                <div class="col-span-8">
                  <template v-if="detail.tokens_transferred_721.length">
                    <div v-for="(item,index) in detail.tokens_transferred_721" :key="index">
                      From
                      <a :href="'/address/' + item.trade_from" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_from }}</a>
                      To
                      <a :href="'/address/' + item.trade_to" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_to }}</a>

                      <span class="font-medium">For</span> ERC-721 TokenID[
                      <a :href="'/token/' + item.contact_address" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_to }}</a>
                      ]
                      <a :href="'/token/' + item.contact_address" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.contact_name }}</a>
                    </div>
                  </template>
                  <template v-if="detail.tokens_transferred.length">
                    <div v-for="(item,index) in detail.tokens_transferred" :key="index">
                      From
                      <a :href="'/address/' + item.trade_from" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_from }}</a>
                      To
                      <a :href="'/address/' + item.trade_to" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_to }}</a>

                      <span class="font-medium">For</span> ERC-721 TokenID[
                      <a :href="'/token/' + item.contact_address" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.trade_to }}</a>
                      ]
                      <a :href="'/token/' + item.contact_address" class="inline-block align-bottom w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">{{ item.contact_name }}</a>
                    </div>
                  </template>
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Value:</div>
                <div class="col-span-8">{{ detail.value }} PI</div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Transaction Fee:</div>
                <div class="col-span-8">{{ detail.trade_fee }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                <div class="col-span-4 mb-1 md:mb-0 font-medium">Gas Price:</div>
                <div class="col-span-8">{{ detail.gas_price }} PI</div>
              </div>

              <div :class="[isShowMore?'h-auto':'h-0 overflow-hidden']" class="transition-all">
                <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                  <div class="col-span-4 mb-1 md:mb-0 font-medium">Gas Limit & Usage by Txn:</div>
                  <div class="col-span-8">{{ detail.gas_limit }} | {{ detail.gas_used_by_trade}}</div>
                </div>
                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
                <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                  <div class="col-span-4 mb-1 md:mb-0 font-medium">Other Attributes:</div>
                  <div class="col-span-8">
                    <div class="bg-gray-200 rounded p-1 inline-block text-sm text-gray-500">
                      Nonce:
                      <span class="text-black">{{ detail.nonce }} </span>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                  <div class="col-span-4 mb-1 md:mb-0 font-medium">Input Data:</div>
                  <div class="col-span-8">
                    <textarea v-if="inputDataDefault" :value="detail.input_data" readonly rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    <textarea v-else :value="detail.input_data_decode" readonly rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                    <div class="mt-2">
                      <button type="button" class="py-2 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="inputDataDefault = !inputDataDefault">{{ inputDataDefault ? 'View Input As Original' : 'Decode Input Data' }}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer text-blue-500" @click="isShowMore=!isShowMore">
                {{ isShowMore ? 'Click to see Less' : 'Click to see More' }}
              </div>

            </div>
          </div>
          <div id="logs" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="logs-tab">
            <div class="text-gray-600 mb-4">Transaction Receipt Event Logs</div>

            <div class="divide-y">
              <div v-for="item in logs.logs_list" :key="item.order_no" class="flex py-4">
                <div class="w-10 h-10 p-4 flex justify-center items-center text-sm rounded-full bg-green-100 text-green-400 mr-5">{{ item.order_no }}</div>
                <div class="flex-1">
                  <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                    <div class="col-span-4 mb-1 md:mb-0 font-medium">Address</div>
                    <div class="col-span-8 break-all">
                      <a :href="'/address/' + item.address" :title="item.address" class=" font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.address }}</a>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                    <div class="col-span-4 mb-1 md:mb-0 font-medium">Name</div>
                    <div class="col-span-8">{{ item.name }}</div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                    <div class="col-span-4 mb-1 md:mb-0 font-medium">Topics</div>
                    <div class="col-span-8">
                      <template v-for="top in 6">
                        <div v-if="item['topics'+ top]" :key="top" class="mb-2 break-all">
                          <span class="inline-block bg-gray-100 rounded w-6 h-6 text-center">{{ top }}</span>
                          {{  item['topics'+ top] }}
                        </div>
                      </template>

                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-12 mb-4">
                    <div class="col-span-4 mb-1 md:mb-0 font-medium">Data</div>
                    <div class="col-span-8 break-all">{{ item.data }}</div>
                  </div>
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
import { Tabs } from 'flowbite'
export default {
  components: {},
  data() {
    return {
      queryForm: {
        field: 'trade_hash',
        value: '',
      },
      activeTab: 'Logs',
      tabs: null,
      detail: {
        tokens_transferred_721: [],
        tokens_transferred: [],
      },
      logs: {
        counts: 0,
        logs_list: [],
      },
      isShowMore: false,
      inputDataDefault: true,
    }
  },
  created() {
    this.queryForm.value = this.$route.params.hash
    this.getTradeDetail()
    this.getTradeDetailLogs()
  },
  mounted() {
    this.initTabs()
  },
  methods: {
    async getTradeDetail() {
      const res = await this.$api.getTradeDetail(this.queryForm)
      this.detail = res.data || {}
    },
    async getTradeDetailLogs() {
      const res = await this.$api.getTradeDetailLogs(this.queryForm)
      this.logs = res.data || this.logs
    },
    initTabs() {
      // create an array of objects with the id, trigger element (eg. button), and the content element
      const tabElements = [
        {
          id: 'Overview',
          triggerEl: document.querySelector('#overview-tab'),
          targetEl: document.querySelector('#overview'),
        },
        {
          id: 'Logs',
          triggerEl: document.querySelector('#logs-tab'),
          targetEl: document.querySelector('#logs'),
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