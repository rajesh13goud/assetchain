const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));
// var contractAddr = '0x98856609DA043DdadEA3924236569F82Dc7e1617';
var contractAddr = '0x9e9F3ACfEF4f7E1B259A27a14262393B6f1922f1';

var contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "seller",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "items",
    "outputs": [
      {
        "name": "seller",
        "type": "address"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "forSale",
        "type": "bool"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "ownerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "priceChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "forSale",
        "type": "bool"
      }
    ],
    "name": "availabilityChanged",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "itemForSale",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getItems",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      },
      {
        "name": "",
        "type": "bool[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "buyItem",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withDraw",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
var account = web3.eth.accounts.privateKeyToAccount('0x'+'1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE')
var myAddr = '0xe13d1118c2eBC2D952760EDfd5625BdDe79250a2';
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log('coinbase account',web3.eth.defaultAccount)
console.log('2',web3.eth.accounts.wallet[0]);
console.log('3',web3.utils.checkAddressChecksum(web3.eth.defaultAccount));
console.log('4',web3.eth.Iban.isValid(web3.eth.defaultAccount));
console.log('5',web3.utils.isAddress(web3.eth.defaultAccount));
var contractInstance = new web3.eth.Contract(contractABI,contractAddr,{from: myAddr});
web3.eth.getBalance(contractAddr, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log(balance);
})
// var bal = contractInstance.methods.withDraw().send({from: contractAddr, to: myAddr, gas: 4700000});
// console.log('before', JSON.stringify(bal));
// var address = '0xD860888A3388a8332ecF7658e021E68962dED350'
// var privateKey1 = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';
   var privateKey = '0x70a300127a5ca8be4a4cc4c8e86496a9930612f43cf4e66d6c4284565cae495d';
   var privateKey2 = '0x4102631101cdb27a5f88de11f279ae8064f52cc3cb2609849fbe6daca525b2fd';

contractInstance.methods.getItems().call((err, res)=>{
  console.log('items available',res)
})
// setTimeout(function() {contractInstance.methods.withDraw().call({from: contractAddr, to: '0xD860888A3388a8332ecF7658e021E68962dED350'},(err, result)=>{
//  if(err){
//    console.log(err,"err")
//  }else{ console.log('withdraaww', result)};
// })},30000);

// function buyItem(data,callback){
//   let tx_b = contractInstance.methods.withDraw();

//   let price = web3.eth.getBalance(contractAddr,(err, wei) => {
//     balance = web3.utils.fromWei(wei, 'ether')
//   console.log('bal',balance);
//   })
//   let tr = {
//     from: contractAddr,
//     to: myAddr,
//     value: price,
//     data: tx_b,
//     gas: 470000
//   }
//   web3.eth.accounts.signTransaction(tr, privateKey1, function(error, signedTx){
//     if(error){
//       console.log(error)
//     }else{
//       web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//       .on('receipt', function(receipt){
//         console.log(receipt)
//       })
//     }
//   })
  
// }
function buyItem(data, callback){
  console.log('heree')
  // var BCdata = {};
  
  let tx_b = contractInstance.methods.buyItem(data.assetId);
  // let tx_g = contractInstance.methods.withDraw()
  
  // let tx_c = contractInstance.methods.buyItem(0).call();
  // console.log(tx_c);
  let enc_tx = tx_b.encodeABI();
  data.price = web3.utils.toWei("0.01", "ether");
  // let trx = {
  //   to: '0xbe1586d34fc174090472e75dE7e6A16A2A3179fd',
  //   data: contractInstance.methods.buyItem(0).send({from: '0xe340c19cB05D6A437320174175d940BA0dF908a3', value: web3.utils.toWei("0.000001", "ether")}).encodeABI(),
  //   gas:4700000
  // }
  let trx = {
    gas: 4700000,
    data: enc_tx,
    value: data.price,
    from: data.userId,
    to:contractAddr
  };
  web3.eth.accounts.signTransaction(trx, privateKey, function(error, signedTx) {
    if (error) {
    console.log('errrrrr',error);
} else {
web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', function (receipt) {
        console.log('receipt', receipt);
  //  contractInstance.methods.withDraw().send({from:contractAddr},(err, res)=>{
    // console.log(res,'ressssssss')
  // })
        // callback(receipt);

let tx_s = contractInstance.methods.sell(1);
let en_s = tx_s.encodeABI();
let trxs = {
  to: contractAddr,
  from: myAddr,
  gas: 4700000,
  data: en_s
}
web3.eth.accounts.signTransaction(trxs, privateKey2, function(err, signedTx){
  if(err){
    console.log('eredere', err)
  }else{
web3.eth.sendSignedTransaction(signedTx.rawTransaction)
.on('recxsds', function(receipt){
  console.log(receipt);
})
  // }
  // })
    }
  // }  
// contractInstance.methods.sell(1).send({from: myAddr},(err,result)=>{
//   console.log("rdrdrdrd", result);
})
 })
//  const iniBal = await web3.eth.getBalance(contractAddr);

 

//  const finBal = await web3.eth.getBalance(contractAddr)
//  console.log(iniBal);
//  console.log(finBal)
// }
// })
}
})
}
function withDraw(){
  contractInstance.methods.withDraw().send({from: myAddr, gas: 470000},(err, res)=>{
    console.log('ryer', res)
  })

}

exports.buyItem = buyItem;
exports.withDraw = withDraw;