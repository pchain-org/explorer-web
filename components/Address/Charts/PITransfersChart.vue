<template>
  <div>
    <div class="flex justify-end">
      <div id="dateRangePickerId" date-rangepicker datepicker-autohide class="flex items-center">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <input id="startDate" :value="queryForm.start_date" datepicker-autohide name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" @blur="handleChange">
        </div>
        <span class="mx-4 text-gray-500">to</span>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <input id="endDate" :value="queryForm.end_date" datepicker-autohide name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" @blur="handleChange">
        </div>
      </div>
    </div>
    
    <div :id="id" style="width:100%;height:500px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import DateRangePicker from 'flowbite-datepicker/js/DateRangePicker'
import resize from '@/mixins/resize'

import { getNowDate } from '@/utils'

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'token-chart',
    },
  },
  data() {
    return {
      chart: null,
      queryForm: {
        field: 'address',
        start_date: '2019-03-29',
        end_date: getNowDate(),
        value: '',
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const dateRangePickerEl = document.getElementById('dateRangePickerId')
      this.rangePicker = new DateRangePicker(dateRangePickerEl, {
        autohide: true,
        todayBtn: true,
        todayBtnMode: 1,
        clearBtn: true,
        format: 'yyyy-mm-dd',
        maxDate: new Date(),
      })
    })
    this.queryForm.value = this.$route.params.addr
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
    handleChange(e) {
      setTimeout(() => {
        if (
          e.target.id === 'startDate' &&
          e.target.value !== this.queryForm.start_date
        ) {
          this.queryForm.start_date = e.target.value
          this.getChartData()
        } else if (
          e.target.id === 'endDate' &&
          e.target.value !== this.queryForm.end_date
        ) {
          this.queryForm.end_date = e.target.value
          this.getChartData()
        }
      }, 1)
    },
    async getChartData() {
      try {
        const res = await this.$api.piTransfersChart(this.queryForm)
        this.initChart(res.data)
      } catch (error) {}
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        // backgroundColor: '#ccc',
        title: {
          top: 20,
          text: 'Token Transfers for ' + this.$route.params.addr,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#333333',
          },
          left: '1%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['Sent(Out)', 'Receive(In)', 'Validator Reward'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#333333',
          },
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '70',
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
            // name: '(%)',
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
            name: 'Sent(Out)',
            type: 'bar',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(137, 189, 27, 0.3)',
            //         },
            //         {
            //           offset: 0.8,
            //           color: 'rgba(137, 189, 27, 0)',
            //         },
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10,
            //   },
            // },
            // itemStyle: {
            //   normal: {
            //     color: 'rgb(137,189,27)',
            //     borderColor: 'rgba(137,189,2,0.27)',
            //     borderWidth: 12,
            //   },
            // },
            data: data.map((item) => item.sent_amount),
          },
          {
            name: 'Receive(In)',
            type: 'bar',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(0, 136, 212, 0.3)',
            //         },
            //         {
            //           offset: 0.8,
            //           color: 'rgba(0, 136, 212, 0)',
            //         },
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10,
            //   },
            // },
            // itemStyle: {
            //   normal: {
            //     color: 'rgb(0,136,212)',
            //     borderColor: 'rgba(0,136,212,0.2)',
            //     borderWidth: 12,
            //   },
            // },
            data: data.map((item) => item.receive_amount),
          },
          {
            name: 'Validator Reward',
            type: 'bar',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(219, 50, 51, 0.3)',
            //         },
            //         {
            //           offset: 0.8,
            //           color: 'rgba(219, 50, 51, 0)',
            //         },
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10,
            //   },
            // },
            // itemStyle: {
            //   normal: {
            //     color: 'rgb(219,50,51)',
            //     borderColor: 'rgba(219,50,51,0.2)',
            //     borderWidth: 12,
            //   },
            // },
            data: data.map((item) => item.validator_reward),
          },
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1],
          },
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
