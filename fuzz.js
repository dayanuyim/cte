const util = require('ethereumjs-util');
const rlp = require('rlp');
const generate = require('ethjs-account').generate;

seed='892h@fs8sk^2hSFR*/8s8shfs.jk39hsoi@hohskd51D1Q8E1%^;DZ1-=.@WWRXNI()VF6/*Z%$C51D1QV*<>FE8RG!FI;"./+-*!DQ39hsoi@hoFE1F5^7E%&*QS'//生成地址所用的种子

function fuzz(){
    for(var epoch = 0; epoch < 50000; epoch++){
        seed += Math.random().toString(36).substring(12);//为避免重复，生成一定数目后对种子进行更新

        for(var i=0; i<1000; i++){
            account = generate(seed);

            for (var nonce=0; nonce < 10; nonce++){
                encodedRlp = rlp.encode([account.address, nonce]);// 进行rlp编码
                hash = util.sha3(encodedRlp);
                contractAddress = hash.slice(12).toString('hex');//取buffer第12个字节后面的部分作为地址

                if(contractAddress.match("badc0de")){
                    console.log(account);
                    console.log(nonce);
                    console.log(contractAddress);
                    return;
                }
            }
        }
        console.log(epoch);
    }
}
fuzz();
