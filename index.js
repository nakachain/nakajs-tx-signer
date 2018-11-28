const Web3 = require('web3');
const sendTransaction = require('./send');

const web3 = new Web3();

/* BEGIN PARAM INPUT FOR FUNCTION CALL */

// From address, this should be the fromPrivKey's public address
const from = '0x6B36FDf89D706035DC97B6Aa4bC84b2418A452f1'; 

// IMPORTANT: USE A TEST ACCOUNT ONLY!
const fromPrivKey = 'c9c42b955b38575df109d72e05db84b23093f25bcbdbff4093cd84effbc34d9f';

// To address, undefined if contract deployment
const to = '0xc371214F6ca48f1F5Ee74A78aE2C1032E1A06C4a';

// Gas limit of tx
const gasLimit = web3.utils.numberToHex('1000000');

// Amount of NAKA to send
const value = web3.utils.numberToHex('0');

// Data for function call.
const data = web3.eth.abi.encodeFunctionCall(
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
  ['D5D087daABC73Fc6Cc5D9C1131b93ACBD53A2428', '10000000000000'],
);

// Address of the pay by token
const token = undefined; 

// Address of exchanger who will accept NRC Tokens and pay tx fees in NAKA
const exchanger = undefined; 

// 1 NRC Token = ? NAKA
const exchangeRate = undefined; 

// Custom chain id
const chainId = 25;

/* END PARAM INPUT FOR FUNCTION CALL */

sendTransaction({
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
});
