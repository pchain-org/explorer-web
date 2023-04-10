<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">PI Smart Chain Daily Transactions Chart</span>
        </h1>
      </div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-6">
        The chart highlights the total number of transactions on the BSC blockchain.
      </div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-3">

        <div class="grid  grid-cols-1 md:grid-cols-2 md:divide-x text-gray-500">

          <p class="mt-2 mb-2 text-center table-cell break-all">
            <svg class="w-5 h-5 inline-block mr-2 align-sub" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Highest number of <span class="font-bold"> {{ data.max_date_amount }} </span> transactions on {{ data.max_date }}
          </p>
          <p class="mt-2 mb-2 text-center table-cell break-all">
            <svg class="w-5 h-5 inline-block mr-2 align-sub" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Lowest number of
            <span class="font-bold"> {{ data.min_date_amount }} </span>
            transactions on {{ data.min_date }}
          </p>
        </div>
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-4 py-5">
        <div :id="id" :style="{height:height,width:width}" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'
import { getNowDate } from '@/utils'
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
        start_date: '2019-03-29',
        end_date: getNowDate(),
      },
      data: {
        chart_list: [],
        max_date: '',
        max_date_amount: '',
        min_date: '',
        min_date_amount: '',
      },
    }
  },

  mounted() {
    this.getChartData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getChartData() {
      try {
        const res = await this.$api.getDailyTradeChart(this.queryForm)
        this.data = res.data
        setTimeout(this.initChart(this.data.chart_list || []), 1)
      } catch (error) {}
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          top: 40,
          text: 'PI Smart Chain Daily Transactions Chart',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333333',
          },
          subtext: 'Source: pizzap.com',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['trade amount'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#333333',
          },
          show: false,
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
            data: data.map((item) => item.date),
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
          },
        ],
        series: [
          {
            name: 'trade amount',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12,
              },
            },
            data: data.map((item) => item.trade_amount),
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1],
          },
          // {
          //   show: true,
          //   realtime: true,
          //   start: 0,
          //   end: 100,
          //   xAxisIndex: [0, 1],
          // },
        ],
      })
    },
  },
}
</script>
