<template>

  <div class="relative overflow-x-auto sm:rounded-lg">
    <div v-if="data.IsVerfied === 1" class="mb-5 font-medium">
      <svg class="inline-block w-5 h-5 text-green-500 align-middle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      Contract Source Code Verified <span class="text-gray-500">(Exact Match)</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
      <div class="md:col-span-6">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-5 lg:col-span-4 mb-1 md:mb-0">Contract Name:</div>
          <div class="col-span-7 lg:col-span-8">
            <span class="font-bold mb-0">{{ data.Name }}</span>
          </div>
        </div>
        <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-5 lg:col-span-4 mb-1 mb-md-0">Compiler Version</div>
          <div class="col-span-7 lg:col-span-8">
            <span class="font-bold mb-0">{{ data.CompilerVersion }}</span>
          </div>
        </div>
      </div>
      <div class="md:col-span-6">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-5 lg:col-span-4 mb-1 md:mb-0">Optimization Enabled:</div>
          <div class="col-span-7 lg:col-span-8">
            <span class="font-weight-bold mb-0">{{ data.OptimizationEnabled === 1 ? 'Yes' : 'No' }} <span class="font-normal">with</span> {{ data.OptimizationRuns }} <span class="font-normal">runs</span></span>
          </div>
        </div>
        <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-5 lg:col-span-4 mb-1 md:mb-0">Other Settings:</div>
          <div class="col-span-7 lg:col-span-8">
            <span class="font-bold mb-0">
              {{ data.EvmVersion }}
              <span class="font-normal">evmVersion,
                {{ data.LicenseType }}
                <span class="font-normal">license</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div>

      <div class="d-md-flex justify-content-between align-items-center bg-white-content py-2">
        <h4 class="font-medium">Contract Source Code <span class="font-weight-normal text-secondary">({{ data.CompilerType }})</span></h4>
      </div>

      <div class="overflow-x-hidden">
        <pre class="w-full p-3 my-2 max-h-72 text-sm overflow-y-auto bg-gray-100 border rounde">{{ data.SourceCode }}</pre>
      </div>

    </div>

    <div>
      <div class="d-md-flex justify-content-between align-items-center bg-white-content py-2">
        <h4 class="font-medium">Contract ABI</h4>
      </div>

      <div class="overflow-x-hidden">
        <pre class="w-full p-3 my-2 max-h-72 text-sm overflow-y-auto bg-gray-100 border rounded">{{ data.Abi }}</pre>
      </div>
    </div>

    <div>
      <div class="d-md-flex justify-content-between align-items-center bg-white-content py-2">
        <h4 class="font-medium">Contract Creation Code</h4>
      </div>

      <div class="overflow-x-hidden">
        <pre class="w-full p-3 my-2 max-h-72 text-sm overflow-y-auto bg-gray-100 border rounded">{{ data.ContractCode }}</pre>
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
      data: {
        SourceCode: '',
        IsVerfied: '',
      },
    }
  },
  created() {
    this.queryForm.contract_address = this.$route.params.addr
    this.contractQueryByAddress()
  },
  methods: {
    async contractQueryByAddress() {
      try {
        const res = await this.$api.contractQueryByAddress(this.queryForm)
        this.data = res.data || {}
        this.data.SourceCode = window.prettier.format(res.data.SourceCode, {
          parser: 'solidity-parse',
          plugins: window.prettierPlugins,
        })
        this.$emit('getVerifiedStatus', res.data.IsVerfied === 1)
      } catch (error) {}
    },
  },
}
</script>
<style>
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>