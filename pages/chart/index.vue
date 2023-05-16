<template>
  <div class="relative pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap justify-between text-gray-900 dark:text-white">
          <span class="text-xl mr-2">PI Daily Price (USD) Chart</span>

          <nav class="text-sm text-gray-600">
            <a href="/charts" class="text-blue-600 dark:text-blue-500">Charts &amp; Stats</a>
            <span class="mx-2">/</span>
            <a href="/charts#blockchainData" class="text-blue-600 dark:text-blue-500">Blockchain Data</a>
            <span class="mx-2">/</span>
            <span class="">PI Daily Price (USD) Chart</span>
          </nav>
        </h1>
      </div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700 p-4 mb-6">
        The PI daily price(USD) chart shows daily USD price of PI.
      </div>

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-4 py-5">
        <div :id="id" :style="{height:height,width:width}" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import moment from 'moment'
import resize from '@/mixins/resize'
import { getNowDate } from '@/utils'
moment.locale('en')

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
        coin_name: 'Plian',
        coin_symbol: 'PI',
        end_date: getNowDate(),
        start_date: '2019-11-01',
      },
      data: [],
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
        const res = await this.$api.getDailyPriceUsdChart(this.queryForm)
        this.data = res.data
        setTimeout(this.initChart(this.data || []), 1)
      } catch (error) {}
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          top: 40,
          text: 'PI Daily Price(USD) Chart',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333333',
          },
          subtext: 'source: piscan.plian.org',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
          formatter: function (params) {
            return (
              moment(params[0].name).format('dddd, MMMM DD, YYYY') +
              '<br>' +
              params[0].marker +
              params[0].seriesName +
              ': ' +
              '<strong>' +
              Number(params[0].value) +
              '<strong>'
            )
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
            axisLabel: {
              formatter(value) {
                return moment(value).format("MMM 'DD")
              },
            },
            data: data.map((item) => item.date),
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'PI Pirce (USD)',
            nameLocation: 'center',
            nameGap: 64,
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
            name: 'Price',
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
                      color: 'rgba(37, 99, 235, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(37, 99, 235, 0)',
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
                color: 'rgb(37, 99, 235)',
                borderColor: 'rgba(37, 99, 215,0.27)',
                borderWidth: 12,
              },
            },
            data: data.map((item) => item.price),
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
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
