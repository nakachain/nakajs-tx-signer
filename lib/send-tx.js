const Transaction = require('nakajs-tx')
const Web3 = require('web3')
const { isUndefined, isString, isFinite } = require('lodash')

module.exports = async function sendTransaction({
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
}) {
  // Validate fields
  if (isUndefined(rpcUrl)) throw Error('missing `rpcUrl`')
  if (!isString(rpcUrl)) throw Error('`rpcUrl` should be a string')

  if (isUndefined(chainId)) throw Error('missing `chainId`')
  if (!isFinite(chainId)) throw Error('`chainId` should be a number')
  
  if (!from) throw Error('missing `from`')
  if (!isString(from)) throw Error('`from` should be a hex string')

  if (!fromPrivKey) throw Error('missing `fromPrivKey`')
  if (!isString(fromPrivKey)) throw Error('`fromPrivKey` should be a hex string')
  
  if (!isUndefined(to) && !isString(to)) throw Error('`to` should be a hex string')
  if (!isUndefined(nonce) && !isFinite(nonce)) throw Error('`nonce` should be a number')
  if (!isUndefined(gasLimit) && !isFinite(gasLimit)) throw Error('`gasLimit` should be a number')
  if (!isUndefined(gasPrice) && !isString(gasPrice)) throw Error('`gasPrice` should be a hex string')
  if (!isUndefined(value) && !isString(value)) throw Error('`value` should be a string')
  if (!isUndefined(data) && !isString(data)) throw Error('`data` should be a hex string')
  if (!isUndefined(token) && !isString(token)) throw Error('`token` should be a hex string')
  if (!isUndefined(exchanger) && !isString(exchanger)) throw Error('`exchanger` should be a hex string')
  if (!isUndefined(exchangeRate) && !isString(exchangeRate)) throw Error('`exchangeRate` should be a hex string')

  // Construct tx
  const web3 = new Web3(rpcUrl)
  const txParams = {
    chainId,
    to,
    nonce: web3.utils.toHex(!isUndefined(nonce) ? nonce : await web3.eth.getTransactionCount(from, 'pending')),
    gasLimit: web3.utils.numberToHex(gasLimit || 21000),
    gasPrice: gasPrice || '0xB165100C4',
    value: web3.utils.numberToHex(value || '0'),
    data,
    token,
    exchanger,
    exchangeRate,
  }
  console.log('tx', txParams)
  const tx = new Transaction(txParams)
  tx.sign(Buffer.from(fromPrivKey, 'hex'))

  // Send tx
  web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex')).on('receipt', console.log)
}
