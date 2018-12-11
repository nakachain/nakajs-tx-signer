const Transaction = require('nakajs-tx');
const Web3 = require('web3');

const web3 = new Web3('http://api.nakabase.com');

module.exports = async function sendTransaction({ 
  from,
  fromPrivKey, 
  to,
  gasLimit,
  value,
  data,
  token,
  exchanger,
  exchangeRate,
  chainId,
}) {
  const txParams = { 
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(from)), 
    gasPrice: "0xB165100C4", // Don't change
    chainId,
  };
  if (gasLimit) {
    txParams.gasLimit = gasLimit;
  }
  if (to) {
    txParams.to = to;
  }
  if (value) {
    txParams.value = value;
  }
  if (data) {
    txParams.data = data;
  }
  if (token) {
    txParams.token = token;
  }
  if (exchanger) {
    txParams.exchanger = exchanger;
  }
  if (exchangeRate) {
    txParams.exchangeRate = exchangeRate;
  }
  console.log('tx', txParams);
  const tx = new Transaction(txParams);

  // Sign tx
  const privateKey = Buffer.from(fromPrivKey, 'hex');
  tx.sign(privateKey);

  // Serialize tx
  const serializedTx = tx.serialize();
  console.log('serialized', serializedTx.toString('hex'));

  // Send signed tx
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
};
