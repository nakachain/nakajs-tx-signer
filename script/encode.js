require('dotenv').config()
const { isUndefined } = require('lodash')
const Web3 = require('web3')
const RLP = require('rlp')

const getEnv = require('./get-env')

const web3 = new Web3()
const envParams = getEnv()
const txParams = {
  nonce: web3.utils.toHex(!isUndefined(envParams.nonce) ? envParams.nonce : 0),
  gasPrice: !isUndefined(envParams.gasPrice) ? web3.utils.numberToHex(envParams.gasPrice) : '0xB165100C4',
  gasLimit: web3.utils.numberToHex(envParams.gasLimit || 21000),
  to: envParams.to,
  value: web3.utils.numberToHex(envParams.value || '0'),
  data: envParams.data,
  token: envParams.token,
  exchanger: envParams.exchanger,
  exchangeRate: envParams.exchangeRate,
}
// Add signature values only if chainId is specified.
// If no chainId, we are signing it the pre-EIP155 way.
if (envParams.chainId) {
  txParams.v = Number(envParams.chainId)
  txParams.r = 0
  txParams.s = 0
}
console.log('TX:', JSON.stringify(txParams))

const encodeInput = [
  txParams.nonce,
  txParams.gasPrice,
  txParams.gasLimit,
  txParams.to,
  txParams.value,
  txParams.data,
  txParams.token,
  txParams.exchanger,
  txParams.exchangeRate,
  txParams.v,
  txParams.r,
  txParams.s,
]
if (!isUndefined(txParams.v)) {
  encodeInput.push(txParams.v)
  encodeInput.push(txParams.r)
  encodeInput.push(txParams.s)
}
const encoded = RLP.encode(encodeInput)
console.log('ENCODED:', `0x${encoded.toString('hex')}`)
