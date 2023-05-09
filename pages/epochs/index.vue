<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4 mt-6">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">Epochs</span>
        </h1>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center text-sm font-medium px-4 py-5">
          <span class="text-gray-500 md:mb-0 mb-3">(Total of {{ data.counts }} Epochs)</span>
          <Pagination :total="+data.counts" :page-num="+queryForm.start" :page-size="+queryForm.length" @change="pageChange" />
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" class="px-6 py-3">
                  End Time
                </th>
                <th scope="col" class="px-6 py-3">
                  Reward Per Block
                </th>
                <th scope="col" class="px-6 py-3">
                  Validators
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in epoch_list" :key="item.number" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" class="px-6 py-4">
                  <a :href="'/epoch/' + item.number" class="inline-block w-36 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.number }}</a>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.start_block">{{ item.start_time }}</div>
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div class="inline-block cursor-pointer" data-tooltip-target="age-tooltip-bottom" data-tooltip-placement="bottom" @mouseenter="tooltipContent=item.end_block">{{ item.end_time }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ item.reward_per_block }}
                </td>
                <td class="px-6 py-4">
                  {{ item.validator_num }}
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
        counts: '0',
        epoch_list: [],
      },
      epoch_list: [],
      tooltipContent: '',
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(Number(this.data.counts) / Number(this.queryForm.length))
    },
  },
  created() {
    this.getEpochList()
  },
  methods: {
    async getEpochList() {
      try {
        const res = await this.$api.getEpochList(this.queryForm)
        this.data = res.data
        this.epoch_list = this.setCurrentPageData(
          this.data.epoch_list,
          +this.queryForm.start,
          +this.queryForm.length
        )
        this.$nextTick(() => {
          initTooltips()
        })
      } catch (error) {}
    },
    pageChange({ page, size }) {
      this.queryForm.start = String(page)
      this.queryForm.length = String(size)
      this.epoch_list = this.setCurrentPageData(
        this.data.epoch_list,
        +this.queryForm.start,
        +this.queryForm.length
      )
    },
    /**
     * setCurrentPageData 前端分页
     * @param {*} data 源数据
     * @param {*} curPage 当前页
     * @param {*} curPageSize
     */
    setCurrentPageData(data, curPage, pageSize) {
      const begin = (curPage - 1) * pageSize
      return data.slice(begin, begin + pageSize)
    },
  },
}
</script>