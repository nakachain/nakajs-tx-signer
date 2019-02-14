require('dotenv').config()

const sendTransaction = require('../lib/send-tx')

/**
 * Send NAKA
 * 
 * 1. Create a .env in the root project folder and add the necessary fields.
 * Required Fields:
 * - RPC_URL
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - TO
 * - VALUE
 * 
 * .env
 * ====
 * RPC_URL=
 * CHAIN_ID=
 * FROM_ADDRESS=
 * FROM_PRIVATE_KEY=
 * TO=
 * GAS_LIMIT=
 * GAS_PRICE=
 * VALUE=
 * TOKEN=
 * EXCHANGER=
 * EXCHANGE_RATE=
 * 
 * 2. `npm run send`
 */

// Env variable validation
if (!process.env.RPC_URL) throw Error('missing `RPC_URL` in environment')
if (!process.env.CHAIN_ID) throw Error('missing `CHAIN_ID` in environment')
if (!process.env.FROM_ADDRESS) throw Error('missing `FROM_ADDRESS` in environment')
if (!process.env.FROM_PRIVATE_KEY) throw Error('missing `FROM_PRIVATE_KEY` in environment')
if (!process.env.TO) throw Error('missing `TO` in environment')
if (!process.env.VALUE) throw Error('missing `VALUE` in environment')

const rpcUrl = process.env.RPC_URL
const chainId = process.env.CHAIN_ID
const from = process.env.FROM_ADDRESS
const fromPrivKey = process.env.FROM_PRIVATE_KEY
const to = process.env.TO
const gasLimit = process.env.GAS_LIMIT
const gasPrice = process.env.GAS_PRICE
const value = process.env.VALUE
const token = process.env.TOKEN
const exchanger = process.env.EXCHANGER
const exchangeRate = process.env.EXCHANGE_RATE

sendTransaction({
  rpcUrl,
  chainId,
  from,
  fromPrivKey, 
  to,
  gasLimit,
  gasPrice,
  value,
  token,
  exchanger,
  exchangeRate,
})
