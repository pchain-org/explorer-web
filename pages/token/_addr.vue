<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <!-- detail -->
    <div class="container mx-auto px-4">
      <div class="py-3 border-b">
        <h1 class="flex items-center flex-wrap">
          <img id="icon" class="w-5 h-5 rounded inline-block mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA3BJREFUeF7tnLFtAlEQBf8FLuBCN0Abji1ZpESO3ca14ZgOEBIt0IlDCnCAixhLo68b56tdZof3PyfMcrifngP8bccHqB7j+/cT1c9e/PVyRi9hu6yofkkAxA8XJ0AJgCQqARA+v7gEKAGQhSUAwucXlwAlALKwBED4/OISoARAFpYACJ9fXAKUAMjCEgDh84tLgBIAWVgCIHx+cQlQAiALSwCEzy+ePgF8hE1ACODvA5Dm1foEEsDfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MBXt8//Fex4wl+blf06hMA4fOLE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3myeAvwN1ggRQ8fvNE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MB3tbz03wZ9AXYv08w+/xLAjD9E4DxG7MDnH3+EmDnAidAAnQJJA50BBB6Y3QHkH9lrSNg5wInQAJ0ByAOdAcg9LoDDPtJZkfAzgVOgAToDkAc6A5A6HUH6A4w+zto9vn1OwAMEPwkkfa3b/F0/gSABBMAAqTlNIJp/wSgBGF9AjCAHQGMn36Lh+OPBIAEOwIgQFreEcAIlgCMX0cA5IfLSwCGsARg/EoAyA+XlwAMYQnA+JUAkB8uLwEYwhKA8SsBID9cXgIwhCUA4zd/AhzuJ/T7ANvxgRBulxXV249iaQLZ/JYEQP7hL6QkQAmADKQJWgIg/PyfW0uAEgApWALI/17dJbBPAewdLPPrDoDW1x1g2JeYngOw5yglQAnQk0DiQJdA+RLTEdARQN7AuLYEKAGQRPYluksgWl8fA/sYeLsihfQEsH8uHtH7h18Yof3tSyidv28EQYIJAAHScnoLp/0TgBKE9QnAAHYEMH7zfym0SyAzoCOA8cPVHQEMYUcA49cRAPnh8hKAISwBGL8SAPLD5SUAQ1gCMH4lAOSHy0sAhrAEYPxKAMgPl5cADGEJwPhNnwB/CZQjTiNIxmsAAAAASUVORK5CYII=" alt="">
          <span class="text-xl mr-2">Token</span>
          <span class="mr-2 text-gray-500 text-sm">{{ detail.overview.token_name }}</span>
        </h1>
      </div>
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-6">
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Overview

            <span class="ml-2 rounded px-2 py-1 bg-gray-200 text-gray-600 text-sm">{{ detail.overview.token_types === 1 ? 'ERC20' : detail.overview.token_types === 2 ? 'ERC721' : 'ERC1155' }}</span>
          </div>
          <div class="p-4 text-sm">
            <div v-if="detail.overview.token_types === 1" class="grid grid-cols-12">
              <div class="col-span-6 border-r pr-3">
                <div class="text-gray-500">PRICE</div>
                <div>${{ detail.overview.price_dollar | toThousandFilter }} <span class="ml-1 text-gray-500 text-xs">@{{ detail.overview.price_pi }} PI</span> </div>
              </div>
              <div class="col-span-6 pl-3">

                <div class="text-gray-500">FULLY DILUTED MARKET CAP </div>
                <div>${{ detail.overview.market_cap }}</div>
              </div>
            </div>
            <hr v-if="detail.overview.token_types === 1" class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Total Supply::</div>
              <div class="col-span-8">${{ detail.overview.total_supply }} {{ detail.overview.token_symbol }} <span v-if="detail.overview.circulating_supply" class="text-gray-500">(CSupply: {{ detail.overview.circulating_supply }})</span></div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Holders:</div>
              <div class="col-span-8">{{ detail.overview.holders }}</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Transfers:</div>
              <div class="col-span-8">{{ detail.overview.transfers }}</div>
            </div>
          </div>
        </div>
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Profile Summary</div>
          <div class="p-4 text-sm">
            <div class="grid grid-cols-12">
              <div class="md:col-span-4 col-span-12">Contract:</div>
              <div class="md:col-span-8 col-span-12">
                <a :href="'/address/' + detail.profile_summary.token_address" class="inline-block w-full truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.profile_summary.token_address }}</a>
              </div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">

            <div class="grid grid-cols-12">
              <div class="col-span-4">Decimals:</div>
              <div class="col-span-8">{{ detail.profile_summary.decimals }}</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">

            <div class="grid grid-cols-12">
              <div class="col-span-4">Official Site:</div>
              <div class="col-span-8">
                <a v-if="detail.profile_summary.official_site" :href="detail.profile_summary.official_site" class="inline-block w-full truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ detail.profile_summary.official_site }}</a>
                <span v-else>-</span>
              </div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">

            <div class="grid grid-cols-12">
              <div class="col-span-4">Social Profiles:</div>
              <div class="col-span-8">{{ detail.profile_summary.social_profiles || '-' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TableTabs :token-info="detail" />

  </div>
</template>
<script>
import TableTabs from '@/components/Token/TableTabs'
export default {
  components: {
    TableTabs,
  },
  data() {
    return {
      queryForm: {
        field: 'address',
        value: '',
      },
      detail: {
        overview: {},
        profile_summary: {},
      },
    }
  },
  created() {
    this.queryForm.value = this.$route.params.addr
    this.getAddressDetail()
  },
  methods: {
    async getAddressDetail(address) {
      const res = await this.$api.getTokenDetail(this.queryForm)
      const data = res.data
      this.detail = data
    },
  },
}
</script>