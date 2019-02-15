const { isEmpty } = require('lodash')

module.exports = getEnvVars = () => {
  const rpcUrl = process.env.RPC_URL
  const chainId = Number(process.env.CHAIN_ID)
  const from = process.env.FROM_ADDRESS
  const fromPrivKey = process.env.FROM_PRIVATE_KEY
  const to = process.env.TO || undefined
  const nonce = !isEmpty(process.env.NONCE) ? Number(process.env.NONCE) : undefined
  const gasLimit = !isEmpty(process.env.GAS_LIMIT) ? Number(process.env.GAS_LIMIT) : undefined
  const gasPrice = process.env.GAS_PRICE || undefined
  const value = process.env.VALUE || undefined
  const token = process.env.TOKEN || undefined
  const exchanger = process.env.EXCHANGER || undefined
  const exchangeRate = process.env.EXCHANGE_RATE || undefined

  return {
    rpcUrl,
    chainId,
    from,
    fromPrivKey, 
    to,
    nonce,
    gasLimit,
    gasPrice,
    value,
    token,
    exchanger,
    exchangeRate,
  }
}
