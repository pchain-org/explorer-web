<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Epoch</span>
          <span class="ml-2 text-gray-500">#{{ detail.number }}</span>
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
                <div class="col-span-4">Number:</div>
                <div class="col-span-8">
                  <span class="mr-2">{{ detail.number }}</span>
                  <!-- <a :href="'/block/' + (+ detail.block_no - 1)" class="inline-block p-1 rounded bg-blue-100 truncate align-bottom mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-600 dark:text-blue-500 w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </a>

                  <a :href="'/block/' + (+ detail.block_no + 1)" class="inline-block p-1 rounded bg-blue-100 truncate align-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-600 dark:text-blue-500 w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a> -->

                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4 mb-1 md:mb-0">Time:</div>
                <div class="col-span-8">{{ detail.start_time }} - {{ detail.end_time }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Vote:</div>
                <div class="col-span-8">
                  <span>{{ detail.vote_start_block }}</span>
                  -
                  <span>{{ detail.vote_end_block }} </span>
                </div>
              </div>
              <!-- <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Validated by:</div>
                <div class="col-span-8">
                  <a :href="'/address/' + detail.miner" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.miner }}</a>
                </div>
              </div> -->
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Reveal:</div>
                <div class="col-span-8">{{ detail.reveal_start_block }} - {{ detail.reveal_end_block }}</div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">Validators:</div>
                <div class="col-span-12 overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Voting Power
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Number Of Blocks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in detail.validator_list" :key="item.number" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" class="px-6 py-4">
                          <a :href="'/address/' + item.address" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.address }}</a>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-60 cursor-pointer" :title="item.voting_power">{{ item.voting_power }}</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-36 cursor-pointer" :title="item.block_num">{{ item.block_num }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">

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
        epoch_no: '',
      },
      activeTab: 'Logs',
      tabs: null,
      detail: {
        validator_list: [],
      },
      isShowMore: false,
    }
  },
  created() {
    this.queryForm.epoch_no = +this.$route.params.no
    this.getEpochDetail()
  },
  mounted() {
    this.initTabs()
  },
  methods: {
    async getEpochDetail() {
      const res = await this.$api.getEpochDetail(this.queryForm)
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