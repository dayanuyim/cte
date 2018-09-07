const EthereumTx = require('ethereumjs-tx');
const util = require('ethereumjs-util');

var rawTx = {
  nonce: '0x00',
  gasPrice: '0x3b9aca00',
  gasLimit: '0x15f90',
  to: '0x6B477781b0e68031109f21887e6B5afEAaEB002b',
  value: '0x00',
  data: '0x5468616e6b732c206d616e21',
  v: '0x29',
  r: '0xa5522718c0f95dde27f0827f55de836342ceda594d20458523dd71a539d52ad7',
  s: '0x5710e64311d481764b5ae8ca691b05d14054782c7d489f3511a7abf2f5078962'
};

var tx = new EthereumTx(rawTx);

pubkey=tx.getSenderPublicKey()
pubkeys=pubkey.toString('hex');
var address = util.sha3(pubkey).toString('hex').slice(24);

console.log(pubkeys);
console.log(address);
