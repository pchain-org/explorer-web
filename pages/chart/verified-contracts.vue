<template>

  <div class="relative min-h-screen bg-gray-100 pb-6">
    <div class="container mx-auto px-4">
      <div class="py-3">
        <h1 class="flex items-center flex-wrap">
          <span class="text-xl mr-2">PI Daily Verified Contracts Chart</span>
        </h1>
      </div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mb-6">
        The chart shows the total number of contracts verified daily. Check out the 500 most recent verified contracts!
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
        const res = await this.$api.getDailyVerifiedContractChart(
          this.queryForm
        )
        this.data = res.data
        setTimeout(this.initChart(this.data || []), 1)
      } catch (error) {}
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          top: 40,
          text: 'PI Daily Verified Contracts Chart',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#333333',
          },
          subtext: 'Source: pizzp.io',
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
          data: ['Total Verified Contracts'],
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
            name: 'Total Verified Contracts',
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
            data: data.map((item) => item.total_verified_contracts),
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
        ],
      })
    },
  },
}
</script>
