module.exports = {
  // 测试网
  test: {
    BASE_API: 'https://api-testnet-piscan.plian.org/', // 测试网接口地址
    NAV_DOMAIN: 'https://testnet-v2-piscan.plian.org',
    NETWORK: 'test',
  },
  // 主网
  main: {
    BASE_API: 'https://api-piscan.plian.org/', // 主网接口地址
    NAV_DOMAIN: 'https://piscan.plian.org/?chain=0', // 主网导航地址
    NETWORK: 'main',
  },
}
