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
                <div class="col-span-4">Progress:</div>
                <div class="col-span-8">
                  <div class="w-full inline-flex items-center">
                    <div v-if="psrocess" class="w-2/4 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                      <div class="bg-blue-600 h-1 rounded-full dark:bg-blue-500" :style="{width: psrocess}"></div>
                    </div>
                    <span class="mx-2">{{  psrocess }}</span>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-4">Reward Per Block:</div>
                <div class="col-span-8">
                  <span class="mr-2">{{ detail.reward_per_block }}</span>
                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div class="col-span-4">Epoch Info:</div>
                <div class="col-span-8 overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Stage
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Time(UTC)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-36 cursor-pointer">Delegate/Candidate</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.start_block">Start: {{ detail.start_time }}</div> <br>
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.vote_start_block - 1">End: {{ detail.vote_start_time }}</div>
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-36 cursor-pointer">Vote</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.vote_start_block">Start: {{ detail.vote_start_time }}</div> <br>
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.vote_end_block">End: {{ detail.vote_end_time }}</div>
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-36 cursor-pointer">Reveal Vote</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.reveal_start_block">Start: {{ detail.reveal_start_time }}</div> <br>
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.reveal_end_block">End: {{ detail.reveal_end_time }}</div>
                        </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-36 cursor-pointer">Check</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.reveal_end_block + 1">Start: {{ detail.reveal_end_time }}</div> <br>
                          <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=detail.end_block">End: {{ detail.end_time }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div class="col-span-4">Validators:</div>
                <div class="col-span-8 overflow-x-auto">
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
                          <a :href="'/address/' + item.address" :title="item.address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.address | ellipsisAddress }}</a>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="w-60 cursor-pointer" :title="item.voting_power">{{ item.voting_power }}</div>
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          <div class="cursor-pointer" :title="item.block_num">{{ item.block_num }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
import { Tabs, initTooltips } from 'flowbite'
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
      tooltipContent: '',
    }
  },
  computed: {
    psrocess() {
      const detail = this.detail
      let percent = null
      if (detail.latest_block < detail.start_block) {
        percent = '0%'
      } else if (
        detail.start_block <= detail.latest_block &&
        detail.latest_block < detail.end_block
      ) {
        percent =
          (
            ((detail.latest_block - detail.start_block) /
              (detail.end_block - detail.start_block)) *
            100
          ).toFixed(2) + '%'
      } else if (detail.latest_block >= detail.end_block) {
        percent = '100%'
      }
      return percent
    },
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
      this.$nextTick(() => {
        initTooltips()
      })
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