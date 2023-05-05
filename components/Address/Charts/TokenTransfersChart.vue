<template>
  <div :id="id" style="width:100%;height:500px" />
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

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
        end_date: '',
        start_date: '',
        value: '',
      },
    }
  },
  mounted() {
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
    async getChartData() {
      try {
        const res = await this.$api.getTokensTransfersChart(this.queryForm)
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
          top: 50,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [
            'Token Transfers',
            'Token Contracts Count',
            'Outbound Transfers',
            'Inbound Transfers',
            'Unique Address Sent',
            'Unique Address Received',
          ],
          selected: {
            'Token Transfers': true,
            'Token Contracts Count': true,
            'Outbound Transfers': false,
            'Inbound Transfers': false,
            'Unique Address Sent': false,
            'Unique Address Received': false,
          },
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
            name: 'Token Transfers',
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
            data: data.map((item) => item.token_transfers),
          },
          {
            name: 'Token Contracts Count',
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
                      color: 'rgba(0, 136, 212, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)',
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
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12,
              },
            },
            data: data.map((item) => item.token_contracts_count),
          },
          {
            name: 'Outbound Transfers',
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
            data: data.map((item) => item.outbound_transfers),
          },
          {
            name: 'Inbound Transfers',
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
            data: data.map((item) => item.inbound_transfers),
          },
          {
            name: 'Unique Address Sent',
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
            data: data.map((item) => item.unique_address_sent),
          },
          {
            name: 'Unique Address Received',
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
            data: data.map((item) => item.unique_address_received),
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
