<template>
  <div class="relative overflow-x-auto">
    <div class="mb-4 text-sm flex justify-between items-center">
      <span>
        <svg class="h-5 inline-block align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Write Contract Information
      </span>
      <span class="text-blue-600 cursor-pointer" @click="handleOpenAll">{{ openAll?'[Collapse All]':'[Expand all]' }} </span>
    </div>
    <div v-for="(item,index) in data" :key="index" class="mb-3 border rounded-sm">
      <div class="border-b p-2 bg-gray-100 text-sm cursor-pointer flex justify-between" @click="item.isOpen=!item.isOpen">
        <span>{{ index+1 }} {{ item.function_name }}</span>
        <svg fill="none" class="w-5 h-5 ml-3 inline-block fill-current text-gray-600 transition-all duration-500" :class="[item.isOpen?'rotate-90': '']" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </div>
      <div class="overflow-hidden transition-all duration-500" :class="[item.isOpen?'max-h-screen':'max-h-0']">
        <div v-for="i in item.args.input" :key="i.name" class="p-2">
          <span class="text-sm inline-block mb-1">{{ i.name }}({{ i.type }})</span>
          <input type="text" readonly :placeholder="`${i.name}(${i.type})`" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <div class="p-2 text-sm text-gray-500">
          <div v-for="(o,ind) in item.args.output" :key="ind">{{ o.type }}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ContractInfo',
  props: {
    tokenType: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      queryForm: {
        contract_address: '',
      },
      data: {},
      openAll: false,
    }
  },
  created() {
    this.queryForm.contract_address = this.$route.params.addr
    this.contractWriteFuncQueryByAddress()
  },
  methods: {
    async contractWriteFuncQueryByAddress() {
      try {
        const res = await this.$api.contractWriteFuncQueryByAddress(
          this.queryForm
        )
        this.data =
          res.data.map((item) => ({
            ...item,
            isOpen: false, // 展开/关闭
          })) || []
      } catch (error) {}
    },
    handleOpenAll() {
      this.data.forEach((item) => {
        item.isOpen = !this.openAll
      })
      this.openAll = !this.openAll
    },
  },
}
</script>