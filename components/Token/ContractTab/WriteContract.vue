<template>

  <div class="relative overflow-x-auto sm:rounded-lg">

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
        this.data = res.data || {}
      } catch (error) {}
    },
  },
}
</script>