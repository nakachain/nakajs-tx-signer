require('dotenv').config()
const { isUndefined } = require('lodash')
const Web3 = require('web3')
const Transaction = require('nakajs-tx')

const getEnv = require('./get-env')

/**
 * Encodes the transaction, signs it, and prints out the encoded hex string.
 * 
 * 1. Create a .env in the root project folder and add the necessary fields.
 * Required Fields:
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - NONCE
 * 
 * Allowed Fields:
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - NONCE
 * - GAS_PRICE
 * - GAS_LIMIT
 * - TO
 * - VALUE
 * - DATA
 * - TOKEN
 * - EXCHANGER
 * - EXCHANGE_RATE
 * 
 * 2. `npm run sign`
 */

const web3 = new Web3()
const envParams = getEnv()
const txParams = {
  chainId: envParams.chainId,
  nonce: web3.utils.toHex(!isUndefined(envParams.nonce) ? envParams.nonce : 0),
  gasPrice: !isUndefined(envParams.gasPrice) ? web3.utils.numberToHex(envParams.gasPrice) : '0xB165100C4',
  gasLimit: web3.utils.numberToHex(envParams.gasLimit || 21000),
  to: envParams.to,
  value: web3.utils.numberToHex(envParams.value || '0'),
  data: envParams.data,
  token: envParams.token,
  exchanger: envParams.exchanger,
  exchangeRate: envParams.exchangeRate,
  v: 0,
  r: 0,
  s: 0,
}
console.log('TX:', JSON.stringify(txParams))

const tx = new Transaction(txParams)
tx.sign(Buffer.from(envParams.fromPrivKey, 'hex'))
console.log(`SIGNED: 0x${tx.serialize().toString('hex')}`)
