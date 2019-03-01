require('dotenv').config()

const getEnv = require('./get-env')
const sendTransaction = require('../lib/send-tx')

/**
 * Executes a send NAKA transaction.
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
 * Allowed Fields:
 * - RPC_URL
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - TO
 * - NONCE
 * - GAS_LIMIT
 * - GAS_PRICE
 * - VALUE
 * - TOKEN
 * - EXCHANGER
 * - EXCHANGE_RATE
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

sendTransaction({
  ...getEnv()
})
