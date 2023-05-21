<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <!-- detail -->
    <div class="container mx-auto px-4">
      <div class="py-3 border-b">
        <h1 class="flex items-center flex-wrap">
          <img id="icon" class="w-5 h-5 rounded inline-block mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA3BJREFUeF7tnLFtAlEQBf8FLuBCN0Abji1ZpESO3ca14ZgOEBIt0IlDCnCAixhLo68b56tdZof3PyfMcrifngP8bccHqB7j+/cT1c9e/PVyRi9hu6yofkkAxA8XJ0AJgCQqARA+v7gEKAGQhSUAwucXlwAlALKwBED4/OISoARAFpYACJ9fXAKUAMjCEgDh84tLgBIAWVgCIHx+cQlQAiALSwCEzy+ePgF8hE1ACODvA5Dm1foEEsDfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MBXt8//Fex4wl+blf06hMA4fOLE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3myeAvwN1ggRQ8fvNE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MB3tbz03wZ9AXYv08w+/xLAjD9E4DxG7MDnH3+EmDnAidAAnQJJA50BBB6Y3QHkH9lrSNg5wInQAJ0ByAOdAcg9LoDDPtJZkfAzgVOgAToDkAc6A5A6HUH6A4w+zto9vn1OwAMEPwkkfa3b/F0/gSABBMAAqTlNIJp/wSgBGF9AjCAHQGMn36Lh+OPBIAEOwIgQFreEcAIlgCMX0cA5IfLSwCGsARg/EoAyA+XlwAMYQnA+JUAkB8uLwEYwhKA8SsBID9cXgIwhCUA4zd/AhzuJ/T7ANvxgRBulxXV249iaQLZ/JYEQP7hL6QkQAmADKQJWgIg/PyfW0uAEgApWALI/17dJbBPAewdLPPrDoDW1x1g2JeYngOw5yglQAnQk0DiQJdA+RLTEdARQN7AuLYEKAGQRPYluksgWl8fA/sYeLsihfQEsH8uHtH7h18Yof3tSyidv28EQYIJAAHScnoLp/0TgBKE9QnAAHYEMH7zfym0SyAzoCOA8cPVHQEMYUcA49cRAPnh8hKAISwBGL8SAPLD5SUAQ1gCMH4lAOSHy0sAhrAEYPxKAMgPl5cADGEJwPhNnwB/CZQjTiNIxmsAAAAASUVORK5CYII=" alt="">
          <span class="text-xl mr-2">{{ detail.accountType===2?'Contract':'Address' }}</span>
          <span class="mr-2 text-gray-500 text-sm"> {{ $route.params.addr }}</span>
          <ClipboardIcon :text="$route.params.addr" />
        </h1>
      </div>
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-6">
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Overview</div>
          <div class="p-4 text-sm">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Balance:</div>
              <div class="col-span-8">{{ detail.balance }} PI</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">PI Value:</div>
              <div class="col-span-8">${{ detail.pi_value }} (@ ${{ detail.price_pi }}/PI)</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Token</div>
              <!-- <div class="col-span-8">$38.89 (>120)</div> -->
              <div class="col-span-8">
                <div class="relative w-full">
                  <div id="small-input" data-dropdown-toggle="token-dropdown" data-dropdown-placement="bottom" readonly class="flex justify-between cursor-pointer w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <span class="ml-1">
                      <span>{{ detail.tokenTotalPrice | toThousandFilter }}</span>
                      <span class="px-1 py-0.5 rounded bg-blue-400 font-medium ml-2 text-white">{{ detail.token.length }}</span>
                    </span>
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </div>

                  <!-- Dropdown menu -->
                  <div id="token-dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                    <ul class="max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 divide-y" aria-labelledby="dropdownDividerButton" :class="[detail.token.length?'py-2':'']">
                      <li v-for="(addr) in detail.token" :key="addr.address">
                        <a :href="'/token/'+addr.address" class="px-4 py-2 block truncate w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <div class="flex justify-between">
                            <span class="flex-1 truncate">
                              <img v-if="addr.logo" :src="addr.logo" class="h-4 inline-block align-middle" alt="">
                              <img v-else src="@/static/logo_gray.png" alt="" class="h-4 inline-block align-middle">
                              <span class="align-middle">{{ addr.name }} ({{ addr.symbol }})</span>
                            </span>

                            <div class="truncate flex=1">
                              <span class="text-xs p-0.5 bg-gray-100 ml-1 rounded font-medium">${{ addr.price | toThousandFilter }}</span>
                            </div>
                          </div>
                          <div class="text-xs text-gray-500 mt-1">{{ addr.balance | toThousandFilter(null) }} {{ addr.symbol }}</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">More Info</div>
          <div v-if="detail.validatorInfo" class="p-4 text-sm">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Blocks Validated:</div>
              <div class="col-span-8">{{ detail.validatorInfo?.blockNum || '' }} blocks（{{ detail.validatorInfo?.totalReward || '' }} PI VP）</div>
            </div>
          </div>
          <div v-if="detail.contract" class="p-4 text-sm">
            <div class="grid grid-cols-1 md:grid-cols-12">
              <div class="col-span-4">ContractCreator:</div>
              <div class="col-span-8">
                <a :href="'/address/' + detail.contract.creatorAddress" class="inline-block w-32 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.contract.creatorAddress }}</a>
                <span class="inline-block align-top">at txn</span>
                <a :href="'/tx/' + detail.contract.creatorHash" class="inline-block w-32 truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.contract.creatorHash }}</a>
              </div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-1 md:grid-cols-12">
              <div class="col-span-4">TokenTracker:</div>
              <div class="col-span-8">
                <img v-if="detail.contract.logo" :src="detail.contract.logo" alt="" class="w-4 h-4">
                <img v-else src="@/static/logo_gray.png" alt="" class="h-4 inline-block">
                <a :href="'/token/' + detail.contract.address" class="inline-block align-middle max-w-full truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.contract.name }} ({{ detail.contract.symbol }})</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <TableTabs :detail="detail" />

  </div>
</template>
<script>
import TableTabs from '@/components/Address/TableTabs'
export default {
  components: {
    TableTabs,
  },
  data() {
    return {
      queryForm: {
        field: 'address',
        length: '25',
        start: '1',
        value: '',
      },
      detail: {
        balance: '',
        price_pi: '',
        token: [],
        validatorInfo: {
          blockNum: '',
          totalReward: '',
        },
      },
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr
    this.getAddressDetail(this.$route.params.addr)
  },
  methods: {
    async getAddressDetail(address) {
      const res = await this.$api.getAddressDetail({ address })
      const data = res.data
      this.detail = {
        ...data,
        pi_value: (res.data.price_pi * data.balance).toFixed(2),
        tokenTotalPrice:
          data.token &&
          data.token.length &&
          data.token.reduce((acc, cur) => Number(acc) + Number(cur), 0),
      }
    },
  },
}
</script>