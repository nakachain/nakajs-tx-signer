const Transaction = require('nakajs-tx')
const Web3 = require('web3')
require('dotenv').config()

module.exports = async function sendTransaction({ 
  chainId,
  from,
  fromPrivKey, 
  to,
  gasLimit = 21000,
  gasPrice = "0xB165100C4", // Min price
  value = 0,
  data,
  token,
  exchanger,
  exchangeRate,
}) {
  // Validate required .env fields
  if (!process.env.RPC_URL) {
    throw Error('missing RPC_URL in .env')
  }
  if (!process.env.CHAIN_ID) {
    throw Error('missing CHAIN_ID in .env')
  }
  if (!process.env.FROM_ADDRESS) {
    throw Error('missing FROM_ADDRESS in .env')
  }
  if (!process.env.FROM_PRIVATE_KEY) {
    throw Error('missing FROM_PRIVATE_KEY in .env')
  }

  const txParams = { 
    chainId,
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(from)), 
    gasLimit,
    gasPrice,
  }
  if (to) txParams.to = to
  if (value) txParams.value = value
  if (data) txParams.data = data
  if (token) txParams.token = token
  if (exchanger) txParams.exchanger = exchanger
  if (exchangeRate) txParams.exchangeRate = exchangeRate
  console.log('tx', txParams)
  const tx = new Transaction(txParams)

  // Sign tx
  const privateKey = Buffer.from(fromPrivKey, 'hex')
  tx.sign(privateKey)

  // Serialize tx
  const serializedTx = tx.serialize()
  console.log('serialized:', serializedTx.toString('hex'))

  // Send signed tx
  const web3 = new Web3(process.env.RPC_URL)
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('receipt', console.log)
}
