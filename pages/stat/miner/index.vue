<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center justify-between flex-wrap">
          <span class="text-xl mr-2">Top Validators by Blocks</span>
          <nav class="text-sm text-gray-600">
            <a href="/charts" class="text-blue-600 dark:text-blue-500">Charts &amp; Stats</a>
            <span class="mx-2">/</span>
            <a href="/charts#topstats" class="text-blue-600 dark:text-blue-500">Top Statistics</a>
            <span class="mx-2">/</span>
            <span class="">PI Daily Price (USD) Chart</span>
          </nav>
        </h1>
      </div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-6">
        Top Validators by Blocks breakdown the top miner by the number of blocks each validator validated and the percentage validated on the Plian network of the current epoch. The chart can be viewed in last 24 hours, last 7 days and last 14 days.
      </div>

      <div class="">

        <div class="mb-3">
          <svg class="w-4 h-4 inline-block fill-current text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          <span class="text-gray-600 mr-2">Range:</span>
          <button id="states-button" data-dropdown-toggle="dropdown-states" class="flex-shrink-0 w-36 z-10 inline-flex justify-between items-center py-2 px-3 text-sm text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
            {{ filters[queryForm.date_range] }} <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div id="dropdown-states" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
            <li>
              <button type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(1)">
                Last 24 Hours
              </button>
            </li>
            <li>
              <button type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(7)">
                Last 7 Days
              </button>
            </li>
            <li>
              <button type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" @click="filterChange(14)">
                Last 14 Days
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-4 py-5">
        <div :id="id" :style="{height:height,width:width}" />

        <div class="relative overflow-x-auto">
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
                  Blocks Validated
                </th>
                <th scope="col" class="px-6 py-3">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in data" :key="item.index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                  <div class="w-20">{{ index + 1 }}</div>
                </td>
                <td class="px-6 py-4">
                  <a :href="'/address/' + item.verification_address" :title="item.verification_address" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.verification_address }}</a>
                </td>
                <td class="px-6 py-4">
                  <a :href="`/blocks?m=${item.verification_block}`" class="inline-block truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.verification_block }}</a>
                </td>
                <td class="px-6 py-4">
                  {{ item.verification_occupy }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'
import { toThousandFilter } from '@/utils/filters'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'transication-chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '550px',
    },
  },
  data() {
    return {
      chart: null,
      queryForm: {
        date_range: 1,
      },
      data: [],
      filters: { 1: 'Last 24 Hours', 7: 'Last 7 Days', 14: 'Last 14 Days' },
      dashboard: {
        current_epoch: {
          number: 0,
        },
      },
    }
  },

  mounted() {
    this.getDashboard()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getDashboard() {
      try {
        const res = await this.$api.dashboard()
        this.dashboard = res.data
        this.getChartData()
      } catch (error) {}
    },
    filterChange(val) {
      this.queryForm.date_range = val
      this.getChartData()
    },
    async getChartData() {
      try {
        const res = await this.$api.getMinerChart(this.queryForm)
        this.data = res.data
        setTimeout(this.initChart(this.data || []), 1)
      } catch (error) {}
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          top: 30,
          text: `Top Validators by Blocks - Epoch ${this.dashboard.current_epoch.number}`,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333333',
          },
          subtext: 'source: piscan.plian.org',
          left: 'center',
        },
        options3d: {
          enabled: true,
          alpha: 45,
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{b} <br/> {a} : {c} ',
          formatter: function (params) {
            return (
              params.name +
              '<br>' +
              params.marker +
              params.seriesName +
              ': ' +
              '<strong>' +
              toThousandFilter(params.value, null) +
              '<strong>'
            )
          },
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          show: false,
          textStyle: {
            width: '100',
          },
          data: data.map(
            (item) =>
              `${item.verification_address}(${item.verification_occupy})`
          ),
        },
        series: [
          {
            name: 'Blocks Validated',
            type: 'pie',
            // roseType: 'radius',
            // radius: [15, 95],
            // center: ['50%', '38%'],
            radius: '55%',
            center: ['50%', '50%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            data: data.map((item) => ({
              value: item.verification_block,
              name: `${item.verification_address} (${item.verification_occupy})`,
            })),
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
          },
        ],
      })
    },
  },
}
</script>
