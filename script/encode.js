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
  v: envParams.chainId,
  r: 0,
  s: 0,
}
console.log('TX:', JSON.stringify(txParams))

const encoded = RLP.encode([
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
])
console.log('ENCODED:', `0x${encoded.toString('hex')}`)
