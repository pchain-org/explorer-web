<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <!-- detail -->
    <div class="container mx-auto px-4">
      <div class="py-3 border-b">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Transaction Details</span>
        </h1>
      </div>
    </div>

    <div class="container mx-auto px-4 mt-6">
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class=" border-b border-gray-200 dark:border-gray-700">
          <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button id="overview-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="false">Overview</button>
            </li>
            <li class="mr-2" role="presentation">
              <button id="logs-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#logs" type="button" role="tab" aria-controls="logs" aria-selected="false">Logs ({{ logs.counts }})</button>
            </li>
            <!-- <li class="mr-2" role="presentation">
              <button id="comments-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">comments</button>
            </li> -->

          </ul>
        </div>

        <div id="myTabContent">
          <div id="overview" class="p-4 rounded-lg break-words" role="tabpanel" aria-labelledby="overview-tab">
            <div class="text-sm">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Transaction Hash:</div>
                <div class="col-span-8">{{ detail.trade_hash }}</div>
              </div>
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Status:</div>
                <div class="col-span-8">{{ detail.status }}</div>
              </div>
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Block:</div>
                <div class="col-span-8">{{ detail.block_no }}</div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Timestamp:</div>
                <div class="col-span-8">{{ detail.time_stamp }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Transaction Action:</div>
                <div class="col-span-8">9293923</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Sponsored:</div>
                <div class="col-span-8">9293923</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-4">From:</div>
                <div class="col-span-8">{{ detail.trade_from }}</div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Interacted With (To):</div>
                <div class="col-span-8">{{ detail.trade_to }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Tokens Transferred:</div>
                <div class="col-span-8">9293923</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Value:</div>
                <div class="col-span-8">{{ detail.value }}</div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Transaction Fee:</div>
                <div class="col-span-8">{{ detail.trade_fee }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Gas Price:</div>
                <div class="col-span-8">{{ detail.gas_price }} PI</div>
              </div>
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">PI Price:</div>
                <div class="col-span-8"> PI</div>
              </div>

              <div :class="[isShowMore?'h-auto':'h-0 overflow-hidden']" class="transition-all">
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Gas Limit & Usage by Txn:</div>
                  <div class="col-span-8">{{ detail.gas_limit }} & {{ detail.gas_used_by_trade}}</div>
                </div>
                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Other Attributes:</div>
                  <div class="col-span-8">
                    <div class="bg-gray-200 rounded p-1 inline-block text-sm text-gray-500">
                      Nonce:
                      <span class="text-black">{{ detail.nonce }} </span>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4 mb-4">
                  <div class="col-span-4">Input Data:</div>
                  <div class="col-span-8">
                    <textarea id="message" :value="detail.input_data_decode" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer text-blue-500" @click="isShowMore=!isShowMore">
                Click to see More
              </div>

              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Private Note:</div>
                <div class="col-span-8">9293923</div>
              </div>
            </div>
          </div>
          <div id="logs" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="logs-tab">
            <div class="text-gray-600 mb-4">Transaction Receipt Event Logs</div>

            <div class="divide-y">
              <div v-for="item in logs.logs_list" :key="item.order_no" class="flex py-4">
                <div class="w-10 h-10 p-4 flex justify-center items-center text-sm rounded-full bg-green-100 text-green-400 mr-5">{{ item.order_no }}</div>
                <div class="flex-1">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">Address</div>
                    <div class="col-span-8">{{ item.address }}</div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">Name</div>
                    <div class="col-span-8">{{ item.name }}</div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">Topics</div>
                    <div class="col-span-8">
                      <!-- <div v-for="top in item.top"></div> -->
                    </div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">Data</div>
                    <div class="col-span-8">{{ item.data }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!-- <div id="comments" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="comments-tab">
          </div> -->
          <!-- <TestDemo /> -->
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
      detail: {},
      logs: {
        counts: 0,
        logs_list: [],
      },
      isShowMore: false,
    }
  },
  created() {
    this.queryForm.value = this.$route.params.hash
    // this.getTradeDetail()
    // this.getTradeDetailLogs()

    const res = [
      {
        address:
          '0x22776bda26ab65dce0e3d6964f46e58c7def7c76b64547cb623b7d001a56eca4',
        data: 'string',
        function_args: 'string',
        name: 'string',
        order_no: '55',
        topics: {},
        topics1: 'string',
        topics2: 'string',
        topics3: 'string',
        topics4: 'string',
        topics5: 'string',
        topics6: 'string',
      },
      {
        address: 'string',
        data: 'string',
        function_args: 'string',
        name: 'string',
        order_no: '34',
        topics1: 'string',
        topics2: 'string',
        topics3: 'string',
        topics4: 'string',
        topics5: 'string',
        topics6: 'string',
      },
    ]
    this.logs.logs_list = res
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
      const res = await this.$api.getTradeDetailLogs({
        ...this.queryForm,
        length: '25',
        start: '1',
      })
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
        // {
        //   id: 'Comments',
        //   triggerEl: document.querySelector('#comments-tab'),
        //   targetEl: document.querySelector('#comments'),
        // },
      ]

      // options with default values
      const options = {
        defaultTabId: 'Logs',
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