const Transaction = require('nakajs-tx')
const Web3 = require('web3')

const { isEmpty } = require('../util')

module.exports = async function sendTransaction({
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
}) {
  // Validate required .env fields
  if (!rpcUrl) throw Error('missing `rpcUrl`')
  if (!chainId) throw Error('missing `chainId`')
  if (!from) throw Error('missing `from`')
  if (!fromPrivKey) throw Error('missing `fromPrivKey`')

  const web3 = new Web3(rpcUrl)

  // Construct tx
  const txParams = { 
    chainId: Number(chainId),
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(from)), 
    gasLimit: isEmpty(gasLimit) ? web3.utils.numberToHex(21000) : web3.utils.numberToHex(gasLimit),
    gasPrice: isEmpty(gasPrice) ? "0xB165100C4" : gasPrice,
    to: isEmpty(to) ? undefined : to,
    value: isEmpty(value) ? web3.utils.numberToHex('0') : web3.utils.numberToHex(value),
    data: isEmpty(data) ? undefined : data,
    token: isEmpty(token) ? undefined : token,
    exchanger: isEmpty(exchanger) ? undefined : exchanger,
    exchangeRate: isEmpty(exchangeRate) ? undefined : exchangeRate,
  }
  console.log('tx', txParams)
  const tx = new Transaction(txParams)
  tx.sign(Buffer.from(fromPrivKey, 'hex'))
  console.log(tx.serialize().toString('hex'))

  // Send tx
  web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex')).on('receipt', console.log)
}
