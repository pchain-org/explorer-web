<template>
  <div class="relative min-h-screen bg-gray-100 pb-6">
    <!-- detail -->
    <div class="container mx-auto px-4">
      <div class="py-3 border-b">
        <h1 class="flex items-center flex-wrap">
          <img id="icon" class="w-5 h-5 rounded inline-block mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA3BJREFUeF7tnLFtAlEQBf8FLuBCN0Abji1ZpESO3ca14ZgOEBIt0IlDCnCAixhLo68b56tdZof3PyfMcrifngP8bccHqB7j+/cT1c9e/PVyRi9hu6yofkkAxA8XJ0AJgCQqARA+v7gEKAGQhSUAwucXlwAlALKwBED4/OISoARAFpYACJ9fXAKUAMjCEgDh84tLgBIAWVgCIHx+cQlQAiALSwCEzy+ePgF8hE1ACODvA5Dm1foEEsDfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MBXt8//Fex4wl+blf06hMA4fOLE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3myeAvwN1ggRQ8fvNE8DfgTpBAqj4/eYJ4O9AnSABVPx+8wTwd6BOkAAqfr95Avg7UCdIABW/3zwB/B2oEySAit9vngD+DtQJEkDF7zdPAH8H6gQJoOL3m2MB3tbz03wZ9AXYv08w+/xLAjD9E4DxG7MDnH3+EmDnAidAAnQJJA50BBB6Y3QHkH9lrSNg5wInQAJ0ByAOdAcg9LoDDPtJZkfAzgVOgAToDkAc6A5A6HUH6A4w+zto9vn1OwAMEPwkkfa3b/F0/gSABBMAAqTlNIJp/wSgBGF9AjCAHQGMn36Lh+OPBIAEOwIgQFreEcAIlgCMX0cA5IfLSwCGsARg/EoAyA+XlwAMYQnA+JUAkB8uLwEYwhKA8SsBID9cXgIwhCUA4zd/AhzuJ/T7ANvxgRBulxXV249iaQLZ/JYEQP7hL6QkQAmADKQJWgIg/PyfW0uAEgApWALI/17dJbBPAewdLPPrDoDW1x1g2JeYngOw5yglQAnQk0DiQJdA+RLTEdARQN7AuLYEKAGQRPYluksgWl8fA/sYeLsihfQEsH8uHtH7h18Yof3tSyidv28EQYIJAAHScnoLp/0TgBKE9QnAAHYEMH7zfym0SyAzoCOA8cPVHQEMYUcA49cRAPnh8hKAISwBGL8SAPLD5SUAQ1gCMH4lAOSHy0sAhrAEYPxKAMgPl5cADGEJwPhNnwB/CZQjTiNIxmsAAAAASUVORK5CYII=" alt="">
          <span class="text-xl mr-2">Token</span>
          <span class="mr-2 text-gray-500 text-sm"> zkBridgeCreator721</span>
          <svg class="w-5 h-5 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" @click="handleCopy">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
          </svg>
        </h1>
      </div>
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-6">
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Overview</div>
          <div class="p-4 text-sm">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Balance:</div>
              <div class="col-span-8">{{ detail.balance }} PI</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">PI Value:</div>
              <div class="col-span-8">${{ detail.pi_value }} (@ {{ detail.price_pi }}/PI)</div>
            </div>
            <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Token</div>
              <div class="col-span-8">$38.89 (>120)</div>
            </div>
          </div>
        </div>
        <div class="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="border-b px-4 py-5">Profile Summary</div>
          <div v-if="detail.validatorInfo" class="p-4 text-sm">
            <div class="grid grid-cols-12">
              <div class="col-span-4">Contract:</div>
              <div class="col-span-8">0xC5ae0d15593316e0cC905840eD2dE83E2DD4EA9E</div>
            </div>
            <div class="grid grid-cols-12">
              <div class="col-span-4">Social Profiles:</div>
              <div class="col-span-8">Not Available, Update ?</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <TableTabs /> -->

  </div>
</template>
<script>
// import TableTabs from '@/components/Address/TableTabs'
// import TestDemo from '@/components/address/TestDemo'
import { copyText } from '@/utils'
export default {
  components: {
    // TableTabs,
    // TestDemo,
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
    // this.getAddressDetail(this.$route.params.addr)
  },
  methods: {
    async getAddressDetail(address) {
      const res = await this.$api.getAddressDetail({ address })
      const data = res.data
      this.detail = {
        ...data,
        pi_value: (res.data.price_pi * data.balance).toFixed(2),
      }
    },
    handleCopy() {
      copyText(this.$route.params.addr)
    },
  },
}
</script>