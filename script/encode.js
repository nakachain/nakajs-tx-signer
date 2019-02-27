require('dotenv').config()
const { isUndefined } = require('lodash')
const Web3 = require('web3')
const Transaction = require('nakajs-tx')

const getEnv = require('./get-env')

const web3 = new Web3()
const envParams = getEnv()
const txParams = {
  chainId: envParams.chainId,
  to: envParams.to,
  nonce: web3.utils.toHex(!isUndefined(envParams.nonce) ? envParams.nonce : 0),
  gasLimit: web3.utils.numberToHex(envParams.gasLimit || 21000),
  gasPrice: !isUndefined(envParams.gasPrice) ? web3.utils.numberToHex(envParams.gasPrice) : '0xB165100C4',
  value: web3.utils.numberToHex(envParams.value || '0'),
  data: envParams.data,
  token: envParams.token,
  exchanger: envParams.exchanger,
  exchangeRate: envParams.exchangeRate,
}
console.log('tx', JSON.stringify(txParams))

const tx = new Transaction(txParams)
tx.sign(Buffer.from(envParams.fromPrivKey, 'hex'))

const serialized = `0x${tx.serialize().toString('hex')}`
console.log('serialized', serialized)
