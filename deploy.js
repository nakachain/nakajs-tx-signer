const Web3 = require('web3');
const sendTransaction = require('./send');

const web3 = new Web3();

/* BEGIN PARAM INPUT FOR CONTRACT DEPLOYMENT */

// From address, this should be the fromPrivKey's public address
const from = '0x6B36FDf89D706035DC97B6Aa4bC84b2418A452f1'; 

// IMPORTANT: USE A TEST ACCOUNT ONLY!
const fromPrivKey = 'c9c42b955b38575df109d72e05db84b23093f25bcbdbff4093cd84effbc34d9f';

// To address, undefined if contract deployment
const to = undefined;

// Gas limit of tx
const gasLimit = web3.utils.numberToHex('3000000');

// Amount of NAKA to send
const value = web3.utils.numberToHex('0');

// Address of the pay by token
const token = undefined; 

// Address of exchanger who will accept NRC Tokens and pay tx fees in NAKA
const exchanger = undefined; 

// 1 NRC Token = ? NAKA
const exchangeRate = undefined; 

// Custom chain id
const chainId = 25;

// Contract bytecode. Don't include the params at the end.
const bytecode = "0x60806040523480156200001157600080fd5b5060405162001eb238038062001eb283398101806040528101908080518201929190602001805182019291906020018051906020019092919080519060200190929190805190602001909291905050508080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35080600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515620001c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f52657175697265732076616c696420616464726573732e00000000000000000081525060200191505060405180910390fd5b6000865111151562000242576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e616d652063616e6e6f7420626520656d7074792e000000000000000000000081525060200191505060405180910390fd5b60008551111515620002bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f73796d626f6c2063616e6e6f7420626520656d7074792e00000000000000000081525060200191505060405180910390fd5b6000831115156200035b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f746f74616c537570706c79206d7573742062652067726561746572207468616e81526020017f20302e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b856001908051906020019062000373929190620003ff565b5084600290805190602001906200038c929190620003ff565b5083600360006101000a81548160ff021916908360ff1602179055508260008190555082600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050505050620004ae565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200044257805160ff191683800117855562000473565b8280016001018555821562000473579182015b828111156200047257825182559160200191906001019062000455565b5b50905062000482919062000486565b5090565b620004ab91905b80821115620004a75760008160009055506001016200048d565b5090565b90565b6119f480620004be6000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016557806318160ddd146101ca57806323b872dd146101f5578063313ce5671461027a57806370a08231146102ab578063715018a6146103025780638da5cb5b146103195780638f32d59b1461037057806395d89b411461039f578063a9059cbb1461042f578063be45fd6214610494578063dd62ed3e1461053f578063f2fde38b146105b6575b600080fd5b3480156100e157600080fd5b506100ea6105f9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012a57808201518184015260208101905061010f565b50505050905090810190601f1680156101575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017157600080fd5b506101b0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061069b565b604051808215151515815260200191505060405180910390f35b3480156101d657600080fd5b506101df6108b1565b6040518082815260200191505060405180910390f35b34801561020157600080fd5b50610260600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108ba565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f610c81565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102b757600080fd5b506102ec600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c98565b6040518082815260200191505060405180910390f35b34801561030e57600080fd5b50610317610ce1565b005b34801561032557600080fd5b5061032e610e44565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561037c57600080fd5b50610385610e6e565b604051808215151515815260200191505060405180910390f35b3480156103ab57600080fd5b506103b4610ec6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103f45780820151818401526020810190506103d9565b50505050905090810190601f1680156104215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561043b57600080fd5b5061047a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f68565b604051808215151515815260200191505060405180910390f35b3480156104a057600080fd5b50610525600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061127f565b604051808215151515815260200191505060405180910390f35b34801561054b57600080fd5b506105a0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116cc565b6040518082815260200191505060405180910390f35b3480156105c257600080fd5b506105f7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611753565b005b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106915780601f1061066657610100808354040283529160200191610691565b820191906000526020600020905b81548152906001019060200180831161067457829003601f168201915b5050505050905090565b60008082148061072757506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b15156107c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260348152602001807f526571756972657320616d6f756e7420746f2062652030206f7220637572726581526020017f6e7420616c6c6f77616e636520746f206265203000000000000000000000000081525060400191505060405180910390fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60008054905090565b600080606084600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610965576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f52657175697265732076616c696420616464726573732e00000000000000000081525060200191505060405180910390fd5b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549250610a3685600460008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461198090919063ffffffff16565b600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610acb85600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199e90919063ffffffff16565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610b21858461198090919063ffffffff16565b600560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fe19260aff97b920c7df27010903aeb9c8d2be5d310a2c67824cf3f15396e4c1687856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610c38578082015181840152602081019050610c1d565b50505050905090810190601f168015610c655780820380516001836020036101000a031916815260200191505b50935050505060405180910390a3600193505050509392505050565b6000600360009054906101000a900460ff16905090565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610ce9610e6e565b1515610d83576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a8152602001807f4f776e6572206973206f6e6c7920616c6c6f77656420746f2063616c6c20746881526020017f6973206d6574686f642e0000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b606060028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f5e5780601f10610f3357610100808354040283529160200191610f5e565b820191906000526020600020905b815481529060010190602001808311610f4157829003601f168201915b5050505050905090565b6000606083600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611012576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f52657175697265732076616c696420616464726573732e00000000000000000081525060200191505060405180910390fd5b61106484600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461198090919063ffffffff16565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506110f984600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199e90919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a38473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe19260aff97b920c7df27010903aeb9c8d2be5d310a2c67824cf3f15396e4c1686856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561123857808201518184015260208101905061121d565b50505050905090810190601f1680156112655780820380516001836020036101000a031916815260200191505b50935050505060405180910390a360019250505092915050565b60008084600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611328576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f52657175697265732076616c696420616464726573732e00000000000000000081525060200191505060405180910390fd5b853b915061137e85600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461198090919063ffffffff16565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061141385600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461199e90919063ffffffff16565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000821115611588578573ffffffffffffffffffffffffffffffffffffffff1663c0ee0b8a3387876040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611521578082015181840152602081019050611506565b50505050905090810190601f16801561154e5780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15801561156f57600080fd5b505af1158015611583573d6000803e3d6000fd5b505050505b8573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040518082815260200191505060405180910390a38573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe19260aff97b920c7df27010903aeb9c8d2be5d310a2c67824cf3f15396e4c1687876040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611684578082015181840152602081019050611669565b50505050905090810190601f1680156116b15780820380516001836020036101000a031916815260200191505b50935050505060405180910390a36001925050509392505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b61175b610e6e565b15156117f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a8152602001807f4f776e6572206973206f6e6c7920616c6c6f77656420746f2063616c6c20746881526020017f6973206d6574686f642e0000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156118c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f52657175697265732076616c6964206164647265737320666f72206e6577206f81526020017f776e65722e00000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008082841015151561198f57fe5b82840390508091505092915050565b60008082840190508381101580156119b65750828110155b15156119be57fe5b80915050929150505600a165627a7a723058203805ea165425c0cdae99d5529af0873d38adce0915579d22f662e268ab4f23ad0029";

// Constructor params
const params = web3.eth.abi.encodeParameters(
  ['string', 'string', 'uint8', 'uint256', 'address'],
  ['Magic Token', 'MAG', '18', '100000000000000000000000000', '6B36FDf89D706035DC97B6Aa4bC84b2418A452f1'],
).substr(2);

/* END PARAM INPUT FOR CONTRACT DEPLOYMENT */

sendTransaction({
  from,
  fromPrivKey, 
  to,
  gasLimit,
  value,
  data: bytecode + params,
  token,
  exchanger,
  exchangeRate,
  chainId,
});
