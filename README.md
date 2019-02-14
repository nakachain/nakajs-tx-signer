# nakajs-tx-signer

## Install
```bash
npm i --save nakajs-tx-signer
```

## Usage
```js
const { sendTransaction } = require('nakajs-tx-signer')

const rpcUrl = 'http://localhost:8545'
const chainId = 12345
const from = '0x0000000000000000000000000000000000000000'
const fromPrivKey = 'abcdefghijklmnopqrstuvwxyz'
const to = '0x0000000000000000000000000000000000000000'
const gasLimit = 21000
const value = 0
const token = '0x0000000000000000000000000000000000000000'
const exchanger = '0x0000000000000000000000000000000000000000'
const exchangeRate = '0xDE0B6B3A7640000'

// Encode data param with Web3
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
  ['0x0000000000000000000000000000000000000000', '100000000'],
)

sendTransaction({
  rpcUrl,
  chainId,
  from,
  fromPrivKey, 
  to,
  gasLimit,
  value,
  data,
  token,
  exchanger,
  exchangeRate,
})
```

## Local Scripts
1. Clone repo
2. `cd script`
3. Follow the instructions in `tx.js` or `deploy.js`
4. `node tx.js` or `node deploy.js`
