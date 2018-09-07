'use strict';
//var txDecoder = require('ethereum-tx-decoder');
const sha3 = require('ethereumjs-util').sha3;
const Transaction = require('ethereumjs-tx');
const spawn = require('child_process').spawn;

let tx1 = {
  nonce: 0,
  gasPrice: '0x3b9aca00',
  gasLimit: '0x5208',
  to: '0x92b28647ae1f3264661f72fb2eb9625a89d88a31',
  value: '0x1111d67bb1bb0000',
  data: '0x',
  v: 41,
  r: '0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166',
  s: '0x7724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8'
};
 
let tx2 = {
  nonce: 1,
  gasPrice:'0x3b9aca00',
  gasLimit: '0x5208',
  to: '0x92b28647ae1f3264661f72fb2eb9625a89d88a31',
  value: '0x1922e95bca330e00',
  data: '0x',
  v: 41,
  r: '0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166',
  s: '0x2bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de'
};
 
let t1 = new Transaction(tx1);
let t2 = new Transaction(tx2);

let p  = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141';
let r  = tx1.r;
let s1 = tx1.s;
let s2 = tx2.s;
let z1 = '0x' + t1.hash(false).toString("hex");
let z2 = '0x' + t2.hash(false).toString("hex");

let pubkey_ = t1.getSenderPublicKey();
let pubkey  = '0x' + pubkey_.toString('hex');
let address = '0x' + sha3(pubkey_).toString('hex').slice(24);

let derivate = spawn('./derivate_privkey.py', [p, r, s1, s2, z1, z2]);
derivate.stdout.on('data', (data) => {
    console.log('p : ' + p);
    console.log('r : ' + r);
    console.log('s1: ' + s1);
    console.log('s2: ' + s2);
    console.log('z1: ' + z1);
    console.log('z2: ' + z2);
    console.log('');
    console.log(`address: ${address}`);
    console.log(`pubkey : ${pubkey}`);
    console.log(`privkey: ${data}`);
});
