const { isEmpty } = require('lodash')

const formatString = (value) => {
  return !isEmpty(value) ? value : undefined
}

const formatNumber = (value) => {
  return !isEmpty(value) ? Number(value) : undefined
}

module.exports = getEnvVars = () => {
  return {
    rpcUrl: formatString(process.env.RPC_URL),
    chainId: formatNumber(process.env.CHAIN_ID),
    from: formatString(process.env.FROM_ADDRESS),
    fromPrivKey: formatString(process.env.FROM_PRIVATE_KEY), 
    nonce: formatNumber(process.env.NONCE),
    gasPrice: formatString(process.env.GAS_PRICE),
    gasLimit: formatNumber(process.env.GAS_LIMIT),
    to: formatString(process.env.TO),
    value: formatString(process.env.VALUE),
    data: formatString(process.env.DATA),
    token: formatString(process.env.TOKEN),
    exchanger: formatString(process.env.EXCHANGER),
    exchangeRate: formatString(process.env.EXCHANGE_RATE),
  }
}
