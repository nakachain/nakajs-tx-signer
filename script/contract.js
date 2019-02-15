const Web3 = require('web3')
require('dotenv').config()

const sendTransaction = require('../lib/send-tx')

/**
 * Execute a contract transaction
 * 
 * 1. Create a .env in the root project folder and add the necessary fields.
 * Required Fields:
 * - RPC_URL
 * - CHAIN_ID
 * - FROM_ADDRESS
 * - FROM_PRIVATE_KEY
 * - TO
 * - GAS_LIMIT
 * 
 * .env
 * ====
 * RPC_URL=
 * CHAIN_ID=
 * FROM_ADDRESS=
 * FROM_PRIVATE_KEY=
 * TO=
 * NONCE=
 * GAS_LIMIT=
 * GAS_PRICE=
 * VALUE=
 * TOKEN=
 * EXCHANGER=
 * EXCHANGE_RATE=
 * 
 * 2. Edit the `data` for which function you want to call.
 * 3. `npm run contract`
 */

// Env variable validation
if (!process.env.RPC_URL) throw Error('missing `RPC_URL` in environment')
if (!process.env.CHAIN_ID) throw Error('missing `CHAIN_ID` in environment')
if (!process.env.FROM_ADDRESS) throw Error('missing `FROM_ADDRESS` in environment')
if (!process.env.FROM_PRIVATE_KEY) throw Error('missing `FROM_PRIVATE_KEY` in environment')
if (!process.env.TO) throw Error('missing `TO` in environment')
if (!process.env.GAS_LIMIT) throw Error('missing `GAS_LIMIT` in environment')

const rpcUrl = process.env.RPC_URL
const chainId = Number(process.env.CHAIN_ID)
const from = process.env.FROM_ADDRESS
const fromPrivKey = process.env.FROM_PRIVATE_KEY
const to = process.env.TO
const nonce = process.env.NONCE
const gasLimit = process.env.GAS_LIMIT ? Number(process.env.GAS_LIMIT) : undefined
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
  ['AbDc40732ef28a597A5431ADC3E8d11F15F3609e', '100000000'],
)

sendTransaction({
  rpcUrl,
  chainId,
  from,
  fromPrivKey, 
  to,
  nonce,
  gasLimit,
  gasPrice,
  value,
  data,
  token,
  exchanger,
  exchangeRate,
})
