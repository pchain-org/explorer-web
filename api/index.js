// import qs from 'qs'
export default class CreateApi {
  constructor($axios) {
    this.$axios = $axios
  }

  /** 首页 */

  // gas price
  async getGasPrice(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/misc/gas/gasPrice',
      data
    )
    return response
  }

  // home dashboard
  async dashboard(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/index/dashboard',
      data
    )
    return response
  }

  // home 获取最新区块
  async latestBlock(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/index/latestBlock',
      data
    )
    return response
  }

  // home 获取最新交易
  async latestTrade(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/index/latestTrade',
      data
    )
    return response
  }

  // home 获取交易历史趋势图
  async tradeHistoryChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/index/tradeHistoryChart',
      data
    )
    return response
  }

  // home 信息检索
  async retrieval(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/index/retrieval',
      data
    )
    return response
  }

  // home 首页信息检索
  async keySearch(data) {
    const response = await this.$axios.$post('/blockBrowser/index/search', data)
    return response
  }
  /** 首页 */

  // address 信息详情
  async getAddressDetail(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/address/detail',
      data
    )
    return response
  }

  // Transactions
  async getContractTradeList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/contractTradeList',
      data
    )
    return response
  }

  // Internal Txns
  async getInternalTradeList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/internalTradeList',
      data
    )
    return response
  }

  // ERC20 Token Txns
  async getContractTradeTokenList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/contractTradeTokenList',
      data
    )
    return response
  }

  // ERC721 Token Txns
  async getContractTrade721List(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/contractTrade721List',
      data
    )
    return response
  }

  // ValidatedBlock
  async getValidatedBlockList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/validatedBlockList',
      data
    )
    return response
  }

  // transications chart
  async getTradeChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/analysis/tradeChart',
      data
    )
    return response
  }

  // PI Balance chart
  async getBalanceChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/analysis/balanceChart',
      data
    )
    return response
  }

  // Transaction Fees chart
  async getTradeFeeChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/analysis/tradeFeeChart',
      data
    )
    return response
  }

  // token transfers chart
  async getTokensTransfersChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/analysis/tokensChart',
      data
    )
    return response
  }

  // token transfers chart
  async piTransfersChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractInternalTrade/analysis/tradeVolumeChart',
      data
    )
    return response
  }

  /** tx detail */

  // overView
  async getTradeDetail(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/trade/tradeDetail',
      data
    )
    return response
  }

  // logs
  async getTradeDetailLogs(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/trade/tradeDetailLogs',
      data
    )
    return response
  }
  /** tx detail */

  /** blockchain */
  // VerifiedContracts
  async getContractsVerifiedList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/contractsVerified/contractsVerifiedList',
      data
    )
    return response
  }

  // blocks
  async getBlockList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/block/blockList',
      data
    )
    return response
  }

  // Transactions
  async getTradeList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/trade/tradeList',
      data
    )
    return response
  }

  // PendingTransactions
  async getPendingTradeList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/pendingTrade/pendingTradeList',
      data
    )
    return response
  }

  // Top Accounts
  async getAccountList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/blockChain/account/accountList',
      data
    )
    return response
  }
  /** blockchain */

  /** token */
  // ERC20 Tokens By MarketCap
  async getTokenListByMarketCap(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/marketCap/tokenList',
      data
    )
    return response
  }

  // ERC20 Tokens By Volume
  async getTokenListByVolume(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/volume/tokenList',
      data
    )
    return response
  }

  // View ERC20 Transfers
  async getTokenTradeList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/tokenTrade/tokenTradeList',
      data
    )
    return response
  }

  // ERC721 Top Tokens
  async getTokenNFTList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/tokenNft/tokenNftList',
      data
    )
    return response
  }

  // View ERC721 Transfers
  async getTokenTradeNFTList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/tokenTradeNft/tokenTradeNftList',
      data
    )
    return response
  }

  // ERC1155 Top Tokens
  async getTokenMultiList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/tokenMulti/tokenMultiList',
      data
    )
    return response
  }

  // View ERC1155 Transfers
  async getTokenTradeMultiList(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/tokens/tokenTradeMulti/tokenTradeMultiList',
      data
    )
    return response
  }

  /** tokens */

  /** Resources */

  // Daily Transactions Chart
  async getDailyTradeChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/resources/chartStats/blockChainData/dailyTradeChart',
      data
    )
    return response
  }

  // Daily Verified Contracts Chart
  async getDailyVerifiedContractChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/resources/chartStats/contractData/dailyVerifiedContractChart',
      data
    )
    return response
  }

  // Daily Price USD Chart
  async getDailyPriceUsdChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/resources/chartStats/marketData/dailyPriceUsdChart',
      data
    )
    return response
  }

  // Validators by Blocks
  async getMinerChart(data) {
    const response = await this.$axios.$post(
      '/blockBrowser/resources/chartStats/validatorsData/minerChart',
      data
    )
    return response
  }

  /** Resources */
}
