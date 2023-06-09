<template>
  <footer class="bg-gray-900 footer-bg">
    <div class="mx-auto w-full container p-4 sm:p-6">
      <div class="md:flex md:justify-between">
        <div>
          <a href="/" class="flex items-center">
            <img src="@/static/logo.png" class="h-8 mr-3" alt="Plian Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Powered by Plian</span>
          </a>
          <a href="javascript:;" class="inline-flex my-4 items-center px-3 py-2 text-sm  rounded-lg text-white hover:text-gray-900 hover:bg-white bg-gray-50 bg-opacity-10" @click="addNetwork">
            <svg aria-hidden="true" class="h-3" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726" />
              <path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625" />
              <path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z" fill="#E27625" />
              <path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z" fill="#E27625" />
              <path d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z" fill="#E27625" />
              <path d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z" fill="#E27625" />
              <path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625" />
              <path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625" />
              <path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z" fill="#D5BFB2" />
              <path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z" fill="#D5BFB2" />
              <path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447" />
              <path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447" />
              <path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228" />
              <path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228" />
              <path d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z" fill="#CC6228" />
              <path d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z" fill="#CC6228" />
              <path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525" />
              <path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525" />
              <path d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z" fill="#E27525" />
              <path d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z" fill="#E27525" />
              <path d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z" fill="#F5841F" />
              <path d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z" fill="#F5841F" />
              <path d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z" fill="#C0AC9D" />
              <path d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z" fill="#161616" />
              <path d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z" fill="#763E1A" />
              <path d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z" fill="#763E1A" />
              <path d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z" fill="#F5841F" />
              <path d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z" fill="#F5841F" />
              <path d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z" fill="#F5841F" />
            </svg>
            <span class="flex-1 ml-2 whitespace-nowrap">Add Plian Network</span>
          </a>
        </div>
        <!-- sm:grid-cols-3 -->
        <div class="grid grid-cols-2 gap-8 sm:gap-6">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase">Company</h2>
            <ul class="text-gray-300 dark:text-gray-400">
              <li class="mb-4">
                <a href="https://wallet.plian.org/#/stake" class="hover:underline">Delegate to Plian</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase ">Support</h2>
            <ul class="text-gray-300 dark:text-gray-400">
              <li class="mb-4">
                <a href="javascript:;" class="hover:underline ">op@plian.io</a>
              </li>
              <li>
                <a href="javascript:;" class="hover:underline">bd@plian.org</a>
              </li>
            </ul>
          </div>
          <!-- <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="#" class="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="hover:underline">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-300 sm:text-center dark:text-gray-400">© 2023 <a href="javascript:;" class="hover:underline">Plian™</a>. All Rights Reserved.</span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a href="https://twitter.com/plian_org" target="_blank" class="text-gray-300 hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span class="sr-only">Twitter page</span>
          </a>
          <a href="https://github.com/pchain-org/pchain" target="_blank" class="text-gray-300 hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only">GitHub account</span>
          </a>
          <a href="https://t.me/pchain_org" target="_blank" class="text-gray-300 hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2261">
              <path d="M417.28 795.733333 429.226667 615.253333 756.906667 320C771.413333 306.773333 753.92 300.373333 734.72 311.893333L330.24 567.466667 155.306667 512C117.76 501.333333 117.333333 475.306667 163.84 456.533333L845.226667 193.706667C876.373333 179.626667 906.24 201.386667 894.293333 249.173333L778.24 795.733333C770.133333 834.56 746.666667 843.946667 714.24 826.026667L537.6 695.466667 452.693333 777.813333C442.88 787.626667 434.773333 795.733333 417.28 795.733333Z" p-id="2262"></path>
            </svg>
            <span class="sr-only">Telegram account</span>
          </a>
          <a href="https://www.reddit.com/user/pchain_org" target="_blank" class="text-gray-300 hover:text-white">
            <svg t="1685108061675" class="w-5 h-5" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3545">
              <path d="M810.817 294.393c27.348 0 51.483-22.523 51.483-51.483s-22.523-51.483-51.483-51.483c-27.348 0-51.483 22.523-51.483 51.483 0 27.348 22.523 51.483 51.483 51.483zM518.015 727.16c-91.7 0-144.794-38.61-144.794-38.61-4.827-3.219-9.653-1.609-11.263 3.219l-9.653 17.696c-1.609 4.827-1.609 11.263 3.219 14.478 0 0 45.045 46.657 162.49 46.657s159.27-49.872 159.27-49.872c3.219-3.219 3.219-9.653 1.609-12.87l-11.263-16.090c-3.219-3.219-8.043-4.827-12.87-1.609 0-1.609-45.045 37.003-136.749 37.003zM352.311 603.284c27.348 0 51.483-22.523 51.483-51.483s-22.523-51.483-51.483-51.483c-27.348 0-51.483 22.523-51.483 51.483 1.609 28.959 24.132 51.483 51.483 51.483zM657.982 603.284c27.348 0 51.483-22.523 51.483-51.483s-22.523-51.483-51.483-51.483-51.483 22.523-51.483 51.483c0 28.959 22.523 51.483 51.483 51.483zM709.463 234.87c-8.043-3.219-94.919-32.174-131.922-6.434-38.61 27.348-37.003 117.441-33.786 117.441 85.266 6.434 164.097 32.174 223.622 72.396 4.827 3.219 56.308-41.828 112.617-32.174 56.308 9.653 94.919 62.742 77.222 122.268-17.696 57.917-72.396 75.615-70.787 93.309v14.478c0 149.619-170.532 270.278-381.285 270.278s-381.285-120.659-381.285-270.278c0-8.043 0-14.478 1.609-22.523 0-1.609-38.61-22.523-53.090-57.917-14.478-33.786-8.043-74.004 6.434-98.137 24.132-37.003 53.090-51.483 93.309-51.483s83.658 24.132 85.266 24.132c64.353-38.61 148.009-62.742 238.1-64.353 3.219 0-6.434-109.398 54.7-149.619 62.742-40.22 165.705 0 167.315 0v3.219c16.090-35.394 51.483-59.525 91.7-59.525 56.308 0 101.356 46.657 101.356 102.962 0 56.308-45.045 102.962-101.356 102.962s-101.356-46.657-101.356-102.962c0-3.219 0-6.434 1.609-8.043z" fill="" p-id="3546"></path>
            </svg>
            <span class="sr-only">Reddit page</span>
          </a>
          <a href="https://plian-org.medium.com" target="_blank" class="text-gray-300 hover:text-white">
            <svg t="1685108220994" class="w-5 h-5" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4520" width="128" height="128">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m256 253.7l-40.8 39.1c-3.6 2.7-5.3 7.1-4.6 11.4v287.7c-0.7 4.4 1 8.8 4.6 11.4l40 39.1v8.7H566.4v-8.3l41.3-40.1c4.1-4.1 4.1-5.3 4.1-11.4V422.5l-115 291.6h-15.5L347.5 422.5V618c-1.2 8.2 1.7 16.5 7.5 22.4l53.8 65.1v8.7H256v-8.7l53.8-65.1c5.8-5.9 8.3-14.3 7-22.4V392c0.7-6.3-1.7-12.4-6.5-16.7l-47.8-57.6V309H411l114.6 251.5 100.9-251.3H768v8.5z" p-id="4521"></path>
            </svg>
            <span class="sr-only">Medium page</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import utilsWeb3 from '@/utils/web3'
import { getChainNum } from '@/utils/chain'
const { checkWeb3, addNetwork, getChainId } = utilsWeb3
export default {
  data() {
    return {
      network: process.env.NETWORK,
      chainNum: getChainNum(),
      params: {
        test: {
          0: {
            chainId: '0xfe3005', // 8007736
            chainName: 'Plian Testnet Main', // 16658437
            nativeCurrency: {
              name: 'TPI',
              symbol: 'TPI',
              decimals: 18,
            },
            rpcUrls: ['https://testnet.plian.io/testnet'],
            blockExplorerUrls: ['https://testnet-v2-piscan.plian.org'],
          },
          1: {
            chainId: '0x999d4b', // 10067275
            chainName: 'Plian Testnet Subchain 1', // 16658437
            nativeCurrency: {
              name: 'TPI',
              symbol: 'TPI',
              decimals: 18,
            },
            rpcUrls: ['https://testnet.plian.io/child_test'],
            blockExplorerUrls: ['https://testnet-v2-piscan.plian.org'],
          },
        },
        main: {
          0: {
            chainId: '0x2007d4', // 2099156
            chainName: 'Plian Mainnet Main',
            nativeCurrency: {
              name: 'PI',
              symbol: 'PI',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.plian.io/pchain'],
            blockExplorerUrls: ['https://v2-piscan.plian.org'],
          },
          1: {
            chainId: '0x7a3038', // 8007736
            chainName: 'Plian Mainnet Subchain 1', // 2099156
            nativeCurrency: {
              name: 'PI',
              symbol: 'PI',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.plian.io/child_0'],
            blockExplorerUrls: ['https://v2-piscan.plian.org'],
          },
        },
      },
    }
  },
  methods: {
    async addNetwork() {
      const hasWeb3 = checkWeb3()
      if (hasWeb3) {
        let network = 0
        network = await getChainId()
        const chainParams = this.params[this.network][this.chainNum]
        let params = null
        if (network === Number(chainParams.chainId)) {
          this.$message.error(
            'Plian Network has already been added to Metamask'
          )
        } else {
          params = [chainParams]
          const result = await addNetwork(params)
          if (result.error) {
            this.$message.error(result.error)
          }
        }
      } else {
        this.$message.error('MetaMask not Install')
      }
    },
  },
}
</script>
<style scoped>
.footer-bg {
  background-image: url('@/static/svg/index_section_bg.svg');
}
</style>
