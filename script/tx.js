const Web3 = require('web3')
require('dotenv').config({ path: process.cwd() })

const sendTransaction = require('../lib/send-tx')

/**
 * Create a .env in the root project folder and add the necessary fields.
 * RPC_URL=
 * CHAIN_ID=
 * FROM_ADDRESS=
 * FROM_PRIVATE_KEY=
 * TO=
 * GAS_LIMIT=
 * GAS_PRICE=
 * VALUE=0
 * TOKEN=
 * EXCHANGER=
 * EXCHANGE_RATE=
 * 
 * Required Fields:
 * - RPC_URL
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - TO
 * 
 * Usage:
 * $ node tx.js
 */

// Env variable validation
if (!process.env.RPC_URL) throw Error('missing `RPC_URL` in environment')
if (!process.env.CHAIN_ID) throw Error('missing `CHAIN_ID` in environment')
if (!process.env.FROM_ADDRESS) throw Error('missing `FROM_ADDRESS` in environment')
if (!process.env.FROM_PRIVATE_KEY) throw Error('missing `FROM_PRIVATE_KEY` in environment')
if (!process.env.TO) throw Error('missing `TO` in environment')

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

// Encode data
const data = new Web3().eth.abi.encodeFunctionCall(
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, 
  ['0x1352bdd00594359bec75f98f96c62efb159f49d7', '100000000'],
)

sendTransaction({
  rpcUrl,
  chainId,
  from,
  fromPrivKey, 
  to,
  gasLimit,
  gasPrice,
  value,
  data,
  token,
  exchanger,
  exchangeRate,
})
