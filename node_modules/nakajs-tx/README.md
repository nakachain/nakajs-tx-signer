[![NPM Package](https://img.shields.io/npm/v/nakajs-tx.svg?style=flat-square)](https://www.npmjs.org/package/nakajs-tx)

# INSTALL
```
npm install nakajs-tx
```

# USAGE
```javascript
const Transaction = require('nakajs-tx');

// Without pay by token fields
const txParams = {
  nonce: '0x00',
  gasPrice: '0xB165100C4', 
  gasLimit: '0x5208',
  to: '0x0000000000000000000000000000000000000000', 
  value: '0x00', 
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  chainId: 25
};

// With pay by token fields
const txParams = {
  nonce: "0x0",
  gasLimit: "0xB165100C4",
  gasPrice: "0x5208",
  to: "0x1111111111111111111111111111111111111111",
  value: "0x0",
  data: "0x2bdb7097000000000000000000000000c891d581be98880cce6a10f26af2e4cf4e730bbb0000000000000000000000000000000000000000000000000DE0B6B3A7640000",
  token: "0xc891d581be98880cce6a10f26af2e4cf4e730bbb",
  exchanger: "0x8102c0ecece895b8fefbddf42b95b7a20925b0c8",
  exchangeRate: "0xDE0B6B3A7640000",
  chainId: 25
};

const tx = new Transaction(txParams);
const privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');
tx.sign(privateKey);
const serializedTx = tx.serialize();
```

**Note:** this package expects ECMAScript 6 (ES6) as a minimum environment. From browsers lacking ES6 support, please use a shim (like [es6-shim](https://github.com/paulmillr/es6-shim)) before including any of the builds from this repo.
