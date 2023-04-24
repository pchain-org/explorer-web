<template>

  <div class="relative overflow-x-auto">
    <div class="mb-4 text-sm"> Read Contract Information</div>

    <div v-for="(item,index) in data" :key="index" class="mb-3 border rounded-sm">
      <div class="border-b p-2 bg-gray-100 text-sm cursor-pointer" @click="item.isOpen=!item.isOpen">{{ index+1 }} {{ item.function_name }}</div>
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
  name: 'ReadContract',
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
    }
  },
  created() {
    this.queryForm.contract_address = this.$route.params.addr
    this.contractReadFuncQueryByAddress()
  },
  methods: {
    async contractReadFuncQueryByAddress() {
      try {
        const res = await this.$api.contractReadFuncQueryByAddress(
          this.queryForm
        )
        this.data =
          res.data.map((item) => ({
            ...item,
            isOpen: false, // 展开/关闭
          })) || []
      } catch (error) {}
    },
  },
}
</script>