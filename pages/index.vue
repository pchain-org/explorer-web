<template>
  <div class="relative min-h-screen">
    <section class="h-72 pt-12 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="pt-5 md:w-5/12">
          <h1 class="text-blue-700 mb-3 text-xl">Plian Explorer</h1>
          <SearchBox />
        </div>

      </div>
    </section>
    <!-- dashboard -->
    <div class="container mx-auto px-4 relative -top-20">
      <div class="grid lg:grid-cols-3 md:grid-cols-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div class="p-4 md:border-r">
          <div class="flex items-center">
            <figure class="mr-2">
              <img class="w-7 h-7 rounded" :src="iconPi" alt="PI">
            </figure>
            <div class="flex-1">
              <h2 class="text-sm text-gray-500">PI Price</h2>
              <a class="text-size-1 text-link" href="/chart/bnbprice">
                ${{ +dashboard.current_price }}<span class="text-gray-500"> @ {{ dashboard.pi_btc }} BTC</span>

                <span v-if="pricePercentage>0" class="text-xs text-green-600">(+{{ pricePercentage }}%)</span>
                <span v-else class="text-xs text-red-600">({{ pricePercentage }}%)</span>
              </a>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">
          <div class="flex items-center">
            <figure class="mr-2">
              <img :src="iconMarketCap" class="w-7 h-7 rounded" alt="Pi">
            </figure>
            <div class="media-body">
              <h2 class="text-sm text-gray-500">PI Market Cap On Plian</h2>
              <a class="text-size-1 text-link" href="/chart">${{ dashboard.market_value | toThousandFilter }} <span class="text-gray-500"> ({{ dashboard.price_content | toThousandFilter }} PI)</span></a>
            </div>
          </div>
        </div>

        <div class="p-4 md:border-r">
          <div class="flex items-center">
            <figure class="mr-2">
              <img :src="iconTransactions" class="w-7 h-7 rounded" alt="transitions">
            </figure>
            <div class="flex-1">
              <h2 class="text-sm text-gray-500">Transactions</h2>
              <a href="/txs" class="text-size-1 text-link" rel="tooltip" data-toggle="tooltip" data-placement="left" data-html="true" title="" data-original-title="Total Transactions Counter<br>(Update every 5 mins)">{{ dashboard.trade_total | numberFormatter }}</a><span class="text-gray-500 text-sm"> ({{ dashboard.trade_total_tps }} TPS)</span>
            </div>
            <div class="text-right">
              <h2 class="text-sm text-gray-500">Med Gas Price</h2>
              <a href="#" class="text-size-1 text-link">{{ gasData.gas_moderate | toWei | fromWei('gwei') }} Gwei</a>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">

          <div class="flex items-center">
            <figure class="mr-2">
              <img :src="iconBlock" class="w-7 h-7 rounded" alt="block">
            </figure>
            <div class="flex-1 truncate">
              <h2 class="text-sm text-gray-500">Latest Block</h2>
              <a class="text-size-1 text-link" href="/blocks" rel="tooltip" data-placement="bottom" title="The latest Block No"><span id="lastblock">{{ dashboard.latest_block }}</span></a>
              <span class="text-sm text-gray-500">({{ dashboard.avg_block_time }} s)</span>
            </div>
            <div class="text-right flex-1 truncate">
              <h2 class="text-sm text-gray-500">Voting Power</h2>
              <a class="text-size-1 text-link" :title="dashboard.current_epoch.total_voting_power" href="#">
                {{ dashboard.current_epoch.total_voting_power | toThousandFilter }} PI
              </a>
              <a class="text-size-1 text-link text-gray-500" :title="dashboard.current_epoch.total_voting_power" :href="'/epoch/'+dashboard.current_epoch.number">
                (Ep. {{ dashboard.current_epoch.number }})
              </a>
            </div>
          </div>
        </div>

        <div class="p-4 flex flex-col">

          <div class="flex justify-between items-center mb-1">
            <h2 class="text-sm text-uppercase text-secondary">Plian TRANSACTIONS HISTORY LAST 14 DAYS</h2>
            <div class="position-relative float-right z-index-2">
              <a id="customchartsinvoker" class="btn btn-xs btn-icon btn-soft-secondary" href="javascript:;" role="button">
                <i class="fa fa-ellipsis-v btn-icon__inner"></i>
              </a>
            </div>
          </div>
          <div id="container-1" class="flex-1" style="height:130px; overflow: hidden;" data-highcharts-chart="0">
            <highcharts :options="chartOptions" style="width:100%;height:130px"></highcharts>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
        <!-- Latest Blocks -->
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Latest Blocks</div>
          <div class="h-96 overflow-y-auto">

            <ul class="divide-y px-3 divide-gray-200 dark:divide-gray-700">

              <li v-for="(item, index) in latestBlock" :key="index" class="py-3 sm:pb-4">
                <div class="flex items-center space-x-4 flex-wrap">
                  <div class="flex-shrink-0 flex item-center">
                    <div class="w-10 h-10 rounded-md bg-gray-100 text-center leading-10">BK</div>

                    <div class="flex-1 min-w-0 ml-3">
                      <p class="text-sm font-medium truncate dark:text-white">
                        <a :href="`/block/${item.block_no}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ item.block_no }}</a>
                      </p>
                      <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                        {{ item.block_time_interval | timeAgoForSec }}
                      </p>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate dark:text-white max-w-xs">
                      Validated By <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" :href="`/address/${item.block_miner}`">{{ item.block_miner }}</a>
                    </p>
                    <p class="text-xs text-gray-500 truncate dark:text-gray-400 max-w-xs">
                      {{ item.block_trade_amount }} txns in {{ item.block_interval_time }} secs
                    </p>
                  </div>

                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {{ item.block_trade_amount }} PI
                  </div>
                </div>
              </li>

            </ul>

          </div>

          <div class="px-2 py-5 text-center border-t">

            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View all
              blocks</a>

          </div>
        </div>

        <!-- Latest Transactions -->
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Latest Transactions</div>
          <div class="h-96 overflow-y-auto">

            <ul class="divide-y px-3 divide-gray-200 dark:divide-gray-700">
              <li v-for="(item, index) in latestTrade" :key="index" class="py-3 sm:pb-4">

                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <div class="flex item-center mr-4">
                      <div class="w-10 h-10 rounded-full bg-gray-100 text-center leading-10">TX</div>
                      <div class="min-w-0 ml-3 flex-1">
                        <p class="text-sm font-medium text-blue-500 truncate dark:text-white">
                          <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline " :href="`/tx/${item.trade_hash}`">{{ item.trade_hash }}</a>
                        </p>
                        <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                          {{ item.trade_time_interval | timeAgoForSec }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-8">
                    <div class="flex items-center justify-between">
                      <div class="mr-4 overflow-hidden flex-1">
                        <p class="text-sm font-medium truncate dark:text-white max-w-xs">
                          From
                          <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" :href="`/address/${item.trade_from}`">{{ item.trade_from }}</a>
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 max-w-xs">
                          To
                          <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" :href="`/address/${item.trade_to}`">{{ item.trade_to }}</a>
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white text-right">
                        {{ item.trade_amount }} PI
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="px-2 py-5 text-center border-t">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block">View all
              transactions</a>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import { Chart } from 'highcharts-vue'
const iconBlock = require('@/static/svg/Block.svg')
const iconTransactions = require('@/static/svg/Transactions.svg')
const iconMarketCap = require('@/static/svg/MarketCap.svg')
const iconPi = require('@/static/svg/Pi.svg')
export default {
  name: 'IndexPage',
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      iconBlock,
      iconTransactions,
      iconMarketCap,
      iconPi,
      latestBlock: [],
      dashboard: {
        current_epoch: {
          total_voting_power: 0,
        },
        trade_total: 0,
        current_price: 0.001,
        open_price: 0.001,
      },
      latestTrade: [],
      tradeHistoryChart: [],

      chartOptions: {
        chart: {
          spacingTop: 10,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 10,
        },

        title: {
          text: '',
          align: 'left',
        },

        xAxis: {
          title: { text: '' },
          lineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
          labels: {
            step: 7,
          },
          categories: ['Mar 07'],
        },

        yAxis: {
          labels: {
            enabled: true,
          },
          gridLineWidth: 0,
          title: {
            text: null,
          },
        },

        legend: {
          enabled: false,
        },

        credits: {
          enabled: false,
        },

        tooltip: {
          formatter: function () {
            return (
              '<span style="font-size:10px">' +
              this.point.friendlydate +
              '</span><br><table><tr><td style="padding:0">' +
              '<span style="color:' +
              this.series.color +
              '">Transactions: </a></span><b>' +
              this.point.formattedValue +
              '</b><br>' +
              '</td></tr></table>'
            )
          },
        },

        accessibility: {
          enabled: false,
        },

        plotOptions: {
          series: {
            color: '#1e2022',
            enableMouseTracking: true,
            lineWidth: 1,
            shadow: false,
            animation: false,
            cursor: 'pointer',
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            marker: {
              radius: 0,
            },
            point: {
              events: {
                select: function (e) {
                  location.href = 'txs?dt=' + this.options.dt
                },
              },
            },
          },
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
          },
        },

        series: [
          {
            name: 'Transactions',
            type: 'spline',
            data: [
              // {
              //   dt: '2023-03-07',
              //   formattedValue: '124',
              //   friendlydate: 'Tue Mar 07 2023',
              //   price: '$307.38',
              //   y: 124,
              // },
            ],
            allowPointSelect: true,
            pointStart: 0,
          },
        ],
      },
      tradeTimer: null,
      blockTimer: null,
      gasData: {
        gas_moderate: '0',
      },
    }
  },
  computed: {
    pricePercentage() {
      const priceDifference =
        Number(this.dashboard.current_price) - Number(this.dashboard.open_price)
      return ((priceDifference / this.dashboard.open_price) * 100).toFixed(2)
    },
  },
  created() {
    this.getLatestBlock()
    this.getDashboard()
    this.getTradeHistoryChart()
    this.getLatestTrade()
    this.getGasPrice()
  },
  mounted() {
    // this.refreshLatestBlocks()
    // this.refreshLatestTransactions()
  },
  beforeDestroy() {
    // clearInterval(this.blockTimer)
    // clearInterval(this.tradeTimer)
  },
  methods: {
    async getLatestBlock() {
      try {
        const res = await this.$api.latestBlock({})
        this.latestBlock = res.data
      } catch (error) {}
    },
    async getDashboard() {
      try {
        const res = await this.$api.dashboard()
        this.dashboard = res.data
      } catch (error) {}
    },
    async getLatestTrade() {
      try {
        const res = await this.$api.latestTrade()
        this.latestTrade = res.data
      } catch (error) {}
    },
    async getTradeHistoryChart() {
      // 近14天交易图表
      try {
        const res = await this.$api.tradeHistoryChart()
        this.tradeHistoryChart = res.data
        const yData = res.data.map((item) => {
          const dateArr = new Date(item.dt).toDateString().split(' ')
          return {
            ...item,
            formattedValue: item.y.toLocaleString(),
            friendlydate: `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`,
            price: '$307.38',
          }
        })
        const xData = res.data.map((item) => {
          const dateArr = new Date(item.dt).toDateString().split(' ')
          return dateArr[1] + ' ' + dateArr[2]
        })

        this.chartOptions = {
          chart: {
            spacingTop: 10,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 10,
          },

          title: {
            text: '',
            align: 'left',
          },

          xAxis: {
            title: { text: '' },
            lineWidth: 0,
            minorTickLength: 0,
            tickLength: 0,
            labels: {
              step: 7,
            },
            categories: xData,
          },

          yAxis: {
            labels: {
              enabled: true,
            },
            gridLineWidth: 0,
            title: {
              text: null,
            },
          },

          legend: {
            enabled: false,
          },

          credits: {
            enabled: false,
          },

          tooltip: {
            formatter: function () {
              return (
                '<span style="font-size:10px">' +
                this.point.friendlydate +
                '</span><br><table><tr><td style="padding:0">' +
                '<span style="color:' +
                this.series.color +
                '">Transactions: </a></span><b>' +
                this.point.formattedValue +
                '</b><br>' +
                '</td></tr></table>'
              )
            },
          },

          accessibility: {
            enabled: false,
          },
          plotOptions: {
            series: {
              color: '#1e2022',
              enableMouseTracking: true,
              lineWidth: 1,
              shadow: false,
              animation: false,
              cursor: 'pointer',
              states: {
                hover: {
                  lineWidth: 1,
                },
              },
              marker: {
                radius: 0,
              },
              point: {
                events: {
                  select: function (e) {
                    location.href = 'txs?dt=' + this.options.dt
                  },
                },
              },
            },
            column: {
              pointPadding: 0.1,
              borderWidth: 0,
            },
          },
          series: [
            {
              name: 'Transactions',
              type: 'spline',
              data: yData,
              allowPointSelect: true,
              pointStart: 0,
            },
          ],
        }
      } catch (error) {}
    },

    refreshLatestBlocks() {
      this.blockTimer = setInterval(() => {
        this.getLatestBlock()
      }, 10000)
    },
    refreshLatestTransactions() {
      this.tradeTimer = setInterval(() => {
        this.getLatestTrade()
      }, 10000)
    },
    async getGasPrice() {
      const res = await this.$api.getGasPrice()
      this.gasData = res.data
    },
  },
}
</script>

<style scoped></style>