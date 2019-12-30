const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));



var contractAddress = '0x656c31eB62aA7D522A84f83170913f36F14AcBDA';

var contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "sayHello",
      "outputs": [
        {
          "name": "val",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function",
      "signature": "0xef5fb05b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "change",
          "type": "uint256"
        }
      ],
      "name": "changeHello",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x87314ca1"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "returnHell",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe978597f"
    }
  ];


var instance = new web3.eth.Contract(contractABI,contractAddress);

this.walletOwnerAddress = web3.eth.accounts.privateKeyToAccount('0x'+'1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE')
console.log(this.walletOwnerAddress);
web3.eth.defaultAccount = this.walletOwnerAddress.address;
instance.methods.sayHello().call({from:'0xD860888A3388a8332ecF7658e021E68962dED350'},(error,result)=>{
    console.log(result);
})

// instance.methods.changeHello(3).send({from:'0xD860888A3388a8332ecF7658e021E68962dED350',gas:474000},(error,res)=>{
//     console.log(res);
// })

// var obj ={
//     to : '0x656c31eB62aA7D522A84f83170913f36F14AcBDA',
//     data: instance.methods.changeHello(3).encodeABI(),
//     gas : 400000,
// }

// var privateKey = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';

// web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
//     console.log(res);
//     web3.eth.sendSignedTransaction(res.rawTransaction,(err,result)=>{
//         console.log(result);
//     })
// })

// instance.methods.changeHello(3).estimateGas({from:web3.eth.defaultAccount,gas:4700000},(error,res)=>{
//     console.log(res);
// })

instance.methods.returnHell().call({gas:4700000},(error,res)=>{
    console.log("The updated value is : "+res);
})

//console.log(instance.methods.changeHello(3).encodeABI());