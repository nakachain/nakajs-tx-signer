const Web3 = require('web3');
const sendTransaction = require('./send');

const web3 = new Web3();

/* BEGIN PARAM INPUT FOR FUNCTION CALL */

// From address, this should be the fromPrivKey's public address
const from = '0x6B36FDf89D706035DC97B6Aa4bC84b2418A452f1'; 

// IMPORTANT: USE A TEST ACCOUNT ONLY!
const fromPrivKey = 'c9c42b955b38575df109d72e05db84b23093f25bcbdbff4093cd84effbc34d9f';

// To address, undefined if contract deployment
const to = '0x721ba10e6b3d93f5b977c74ea6230ca8d66c67a4';

// Gas limit of tx
const gasLimit = web3.utils.numberToHex('100000');

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
  ['0x1352bdd00594359bec75f98f96c62efb159f49d7', '100000000'],
);

// Address of the pay by token
const token = '0x721ba10e6b3d93f5b977c74ea6230ca8d66c67a4'; 

// Address of exchanger who will accept NRC Tokens and pay tx fees in NAKA
const exchanger = '0xD5D087daABC73Fc6Cc5D9C1131b93ACBD53A2428'; 

// 1 NRC Token = ? NAKA
const exchangeRate = '0xDE0B6B3A7640000'; 

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