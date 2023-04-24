<template>
  <div class="relative min-h-screen bg-gray-100 py-3">
    <div class="container mx-auto px-4">

      <div class="py-4 text-center border-b">
        <h3 class="text-center text-2xl">Verify & Publish Contract Source Code </h3>
        <p class="text-center mt-2 text-sm inline-block text-gray-500 px-3 py-1">COMPILER TYPE AND VERSION SELECTION</p>
      </div>

      <div class="border-top py-4">
        <div class="grid grid-cols-10 mb-4">
          <div class="md:col-span-1 col-span-12 text-secondary mt-3 mb-2">
            <img src="https://bscscan.com/images/undraw/undraw_Security_on_s9ym.svg" width="115" align="left" style="margin-top: -15px; margin-bottom: 10px;margin-right:10px">
          </div>
          <div class="md:col-span-9 col-span-12 text-secondary text-sm text-gray-500 mt-3 mb-2 ml-2">
            Source code verification provides <b>transparency</b> for users interacting with smart contracts.
            By uploading the source code, BscScan will match the compiled code with that on the blockchain.
            Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
            <p><br>Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's "Compiler Input and Output JSON Description" documentation section.</p>
          </div>
        </div>

        <form class="md:w-1/3 lg:w-50 md:mx-auto mt-2" action="/verifyContract-solc-multiple">
          <div class="mb-6">
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please enter the Contract Address you would like to verify</label>
            <input id="address" v-model="formData.contract_address" name="a" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x..." required>
          </div>

          <div class="mb-6">
            <label for="compilerType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please select Compiler Type</label>
            <select id="compilerType" v-model="formData.compiler_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option selected="selected" value="">[Please Select]</option>
              <option value="Solidity">Solidity (Multi-Part files)</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="compilerVersion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please select Compiler Version</label>
            <select id="compilerVersion" v-model="formData.compiler_version" name="c" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option selected="selected" value="">[Please Select]</option>
              <option v-for="item in compilerVersionList" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="licenseType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please select Open Source License Type</label>
            <select id="licenseType" v-model="formData.license_type" name="lictype" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option selected="selected" value="">[Please Select]</option>
              <option v-for="item in compilerLicenseList" :key="item.liscense_type" :value="item.liscense_type">{{ item.liscense_type }} ({{ item.symbol }})</option>
            </select>
          </div>

          <p align="center" class="mt-3">
          <div class="text-center mt-2">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue</button>
            <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="handleReset">Reset</button>
          </div>
          </p>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compilerVersionList: [],
      compilerLicenseList: [],
      formData: {
        compiler_type: 'Solidity',
        compiler_version: '',
        contract_address: '',
        license_type: '',
      },
    }
  },
  created() {
    this.getCompilerVersionList()
    this.getCompilerLicenseList()
  },
  methods: {
    getCompilerVersionList() {
      this.$api
        .compilerVersionList()
        .then((res) => {
          this.compilerVersionList = res.data
        })
        .catch((err) => err)
    },
    getCompilerLicenseList() {
      this.$api
        .compilerLicenseList()
        .then((res) => {
          this.compilerLicenseList = res.data
        })
        .catch((err) => err)
    },
    handleReset() {
      this.formData.contract_address = ''
      this.formData.compiler_version = ''
      this.formData.liscense_type = ''
    },
  },
}
</script>

<style>
</style>