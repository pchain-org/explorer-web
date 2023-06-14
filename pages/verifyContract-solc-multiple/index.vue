<template>
  <div class="relative min-h-screen bg-gray-100 py-3">
    <div class="container mx-auto px-4 py-5">

      <div class="text-center mb-4">
        <div class="w-md-75 w-lg-75 mx-md-auto">
          <h1 class="text-xl">Verify &amp; Publish Contract Source Code </h1>
          <span class="text-center mt-2 text-sm inline-block rounded-2xl bg-blue-500 text-white px-3 py-1">Compiler Type: SOLIDITY MULTI-PART VERIFIER (IMPORTS)</span>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button id="transactions-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#transactions" type="button" role="tab" aria-controls="transactions" aria-selected="false">Contract Source Code</button>
            </li>
            <!-- <li class="mr-2" role="presentation">
              <button id="holders-tab" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#holders" type="button" role="tab" aria-controls="holders" aria-selected="false">Compiler Output</button>
            </li> -->
          </ul>
        </div>

        <div id="myTabContent">
          <div id="transactions" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="transactions-tab">
            <div id="alert-5" class="flex mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800" role="alert">
              <span class="sr-only">Info</span>
              <ul class="list-unstyled list-xs-space alert-text mb-0 mt-2 text-sm">
                <li class="mb-2">1. If it compiles correctly at <a rel="nofollow noopener" href="https://remix.ethereum.org/" class="inline truncate text-blue-600 dark:text-blue-500 hover:underline" target="_blank">REMIX</a>, it should also compile correctly here.</li>
                <li class="mb-2">2. As this is an beta release module, there is limited support for external libraries</li>
                <li>3. There is a timeout of up to 45 seconds for each contract compiled, if you need longer compilation times (up to 3 mins) check out this <a href="javascript:;" target="_blank">API endpoint</a></li>
              </ul>
              <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" data-dismiss-target="#alert-5" aria-label="Close">
                <span class="sr-only">Dismiss</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="md:col-span-5 col-span-12">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract Address</label>
                <input id="address" v-model="formData.contract_address" readonly name="a" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x...">
              </div>
              <div class="md:col-span-5 col-span-12">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Compiler</label>
                <input id="address" v-model="formData.compiler_version" readonly name="a" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x...">
              </div>
              <div class="md:col-span-2 col-span-12">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Optimization</label>
                <select id="countries" v-model="formData.optimization" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </div>

            <form action="https://api-piscan.plian.org/blockBrowser/contract/uploadContractFile" method="post" class="block mt-3 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Please select the Solidity (*.sol) files for upload *</h5>
              <div class="mb-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Step 1:</label>
                <input id="file_input" name="file" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple @change="fileChange">
              </div>
            </form>

            <!-- Constructor Arguments -->
            <div class="block mt-4  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <div class="border-b p-4 text-sm cursor-pointer flex justify-between" @click="argOpen=!argOpen">
                <label class="flex-1 cursor-pointer">
                  Constructor Arguments <a href="https://solidity.readthedocs.io/en/develop/abi-spec.html" class="inline truncate text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="nofollow noopener">ABI-encoded</a> <span class="text-secondary">(for contracts that were created with constructor parameters)</span>
                </label>

                <svg fill="none" class="w-5 h-5 ml-3 inline-block fill-current text-blue-600 transition-all duration-500" :class="[argOpen?'rotate-90': '']" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
              <div class="overflow-hidden transition-all duration-500" :class="[argOpen?'max-h-screen':'max-h-0']">
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                </div>
              </div>
            </div>

            <div class="block mt-4  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <div class="border-b p-4 text-sm cursor-pointer flex" @click="libOpen=!libOpen">
                <label class="flex-1 cursor-pointer">Contract Library Address <span class="text-secondary">(for contracts that use libraries, supports up to 10 libraries)</span></label>

                <svg fill="none" class="w-5 h-5 ml-3 inline-block fill-current text-blue-600 transition-all duration-500" :class="[libOpen?'rotate-90': '']" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
              <div class="overflow-auto transition-all duration-500" :class="[libOpen?'max-h-screen':'max-h-0']">
                <div class="p-4">Note: Library names are case sensitive and affects the keccak library hash</div>

                <div v-for="(item,index) in formData.contract_library_address_list" :key="index" class="grid grid-cols-12">
                  <div class="md:col-span-4 col-span-12 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label :for="`library-name-${index}`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Library_{{ index+1 }} Name:</label>
                    <input :id="`library-name-${index}`" type="text" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <div class="md:col-span-4 col-span-12 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label :for="`contract-address-${index}`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Library_{{ index+1 }} Contract Address:</label>
                    <input :id="`contract-address-${index}`" type="text" placeholder="0x..." class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                </div>
              </div>
            </div>

            <div class="block mt-3  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <div class="border-b p-4 text-sm cursor-pointer flex justify-between" @click="miscOpen=!miscOpen">
                <label class="flex-1 cursor-pointer">Misc Settings <span class="text-secondary">(Runs, EvmVersion &amp; License Type settings)</span></label>
                <svg fill="none" class="w-5 h-5 ml-3 inline-block fill-current text-blue-600 transition-all duration-500" :class="[libOpen?'rotate-90': '']" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
              <div class="overflow-hidden transition-all duration-500" :class="[miscOpen?'max-h-screen':'max-h-0']">
                <div class="grid grid-cols-12 gap-4 p-4">
                  <div class="md:col-span-4 col-span-12">
                    <label for="optimizer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Runs (Optimizer)</label>
                    <input id="optimizer" v-model="formData.optimizer_runs" name="a" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x...">
                  </div>
                  <div class="md:col-span-4 col-span-12">
                    <label for="evm_version" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EVM Version to target</label>
                    <select id="evm_version" v-model="formData.evm_version" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option v-for="(item,index) in evmVersionList" :key="index" :value="item.evm_version">{{ item.evm_version }}</option>
                    </select>
                  </div>
                  <div class="md:col-span-4 col-span-12">
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LicenseType</label>
                    <select id="countries" v-model="formData.license_type" name="lictype" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option selected="selected" value="">[Please Select]</option>
                      <option v-for="item in compilerLicenseList" :key="item.symbol" :value="item.liscense_type">{{ item.liscense_type }} ({{ item.symbol }})</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-2 p-4">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="handleVerify">Verify and Publish</button>
              <button type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="handleReset">Reset</button>
              <a href="/verifyContract" class="inline-block">
                <button type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Return to Main
                </button>
              </a>
            </div>

          </div>
          <!-- result -->
          <div id="holders" class="hidden p-4 rounded-lg" role="tabpanel" aria-labelledby="holders-tab">

          </div>

        </div>

      </div>
    </div>
    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      success modal
    </button>
    <!-- verify successed modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-green-600 dark:text-white">
              Verify successed
            </h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6">
            <h2 class="font-medium mb-3">Token Address</h2>
            <a :href="'/token/' + formData.contract_address" class="inline-block w-full truncate font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ formData.contract_address }}</a>
          </div>
          <!-- Modal footer -->
          <!-- <div class="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Token Detail</button>
            <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
          </div> -->
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Tabs, Modal } from 'flowbite'

export default {
  data() {
    return {
      activeTab: 'Transactions',
      formData: {
        abi: '',
        compiler_type: '',
        compiler_version: '',
        contract_address: '',
        contract_code: '',
        contract_library_address_list: [
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
          { contract_address: '', library_name: '' },
        ],
        contract_name: '',
        evm_version: 'default',
        license_type: '',
        optimization: false,
        optimizer_runs: 200,
      },
      fileData: {
        files: {},
      },
      argOpen: true,
      libOpen: false,
      miscOpen: false,
      evmVersionList: [],
      compilerLicenseList: [],
      resultModal: null,
    }
  },
  created() {
    this.getEvmVersionList()
    this.getCompilerLicenseList()

    this.formData.compiler_version = this.$route.query.c
    this.formData.license_type = this.$route.query.lictype
    this.formData.contract_address = this.$route.query.a
  },
  mounted() {
    this.initTabs()
    this.initModal()
  },
  methods: {
    initModal() {
      // set the modal menu element
      const $targetEl = document.getElementById('defaultModal')
      // options with default values
      const options = {
        placement: 'center-center',
        backdrop: 'dynamic',
        backdropClasses:
          'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
          console.log('modal is hidden')
        },
        onShow: () => {
          console.log('modal is shown')
        },
        onToggle: () => {
          console.log('modal has been toggled')
        },
      }
      this.resultModal = new Modal($targetEl, options)
    },
    handleReset() {
      window.location.reload()
    },
    fileChange(e) {
      this.fileData.files = e.target.files
    },
    handleUpload() {
      const formData = new FormData()
      for (const key in this.fileData.files) {
        formData.append('file', this.fileData.files[key])
      }

      return new Promise((resolve, reject) => {
        this.$api
          .uploadContractFile(formData)
          .then((res) => {
            this.formData.contract_name = res.data.contract_name
            this.formData.contract_code = res.data.contract_code
            resolve()
          })
          .catch((err) => {
            document.querySelector('#file_input').focus()
            reject(err)
          })
      })
    },
    handleVerify() {
      this.handleUpload().then(() => {
        this.$api
          .contractVerify(this.formData)
          .then((res) => {
            this.resultModal.show()
          })
          .catch((err) => err)
      })
    },
    getEvmVersionList() {
      this.$api
        .evmVersionList()
        .then((res) => {
          this.evmVersionList = res.data
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
    initTabs() {
      // create an array of objects with the id, trigger element (eg. button), and the content element
      const tabElements = [
        {
          id: 'Transactions',
          triggerEl: document.querySelector('#transactions-tab'),
          targetEl: document.querySelector('#transactions'),
        },
        // {
        //   id: 'Holders',
        //   triggerEl: document.querySelector('#holders-tab'),
        //   targetEl: document.querySelector('#holders'),
        // },
      ]

      // options with default values
      const options = {
        defaultTabId: 'Contract',
        activeClasses:
          'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
        inactiveClasses:
          'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
        onShow: (val) => {
          this.activeTab = val._activeTab.id
        },
      }
      this.tabs = new Tabs(tabElements, options)
    },
  },
}
</script>