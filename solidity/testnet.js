const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));


var contractAddress = '0xa8aba88f9364ffd8dd71388b09915f6d7d102175';
var contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "assetId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "ownerId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "assetPrice",
          "type": "uint256"
        }
      ],
      "name": "addedAsset",
      "type": "event",
      "signature": "0x5c1e837527a537c546d296ae07453f8e749a9edd69e8d15683b0845ad7ce08e9"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "assetId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "dates",
          "type": "uint256"
        }
      ],
      "name": "ownerShipChange",
      "type": "event",
      "signature": "0xbaf11817d026af2ea3df46905052aa09641be7bd10a7d400297161c383e77525"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "assetId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "maintenanceDesc",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "maintainer",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "maintenance",
      "type": "event",
      "signature": "0x5f62b28e23eec39aaf1d3ca8a2fd8cb345a10f23e21023523365bd09741ef4e6"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "userId",
          "type": "bytes32"
        },
        {
          "name": "Assetid",
          "type": "bytes32"
        },
        {
          "name": "activityDate",
          "type": "uint256"
        },
        {
          "name": "presentAct",
          "type": "bytes32"
        },
        {
          "name": "assetPrice",
          "type": "uint256"
        },
        {
          "name": "aName",
          "type": "bytes32"
        }
      ],
      "name": "setAssetData",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x9b455c20"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "Assetid",
          "type": "bytes32"
        }
      ],
      "name": "getAssetData",
      "outputs": [
        {
          "name": "owner",
          "type": "bytes32[]"
        },
        {
          "name": "assetHistory",
          "type": "uint256[]"
        },
        {
          "name": "activityHistory",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x5197759b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "Assetid",
          "type": "bytes32"
        },
        {
          "name": "newOwnerid",
          "type": "bytes32"
        },
        {
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "ownershipChange",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x55f6d7c4"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "Assetid",
          "type": "bytes32"
        },
        {
          "name": "maintenanceInfo",
          "type": "bytes32"
        },
        {
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "service",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf756b36c"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "AssetId",
          "type": "bytes32"
        }
      ],
      "name": "maintenanceHistory",
      "outputs": [
        {
          "name": "desc",
          "type": "bytes32[]"
        },
        {
          "name": "dates",
          "type": "uint256[]"
        },
        {
          "name": "owners",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0ec51ba0"
    }
];
var account = web3.eth.accounts.privateKeyToAccount('0x'+'1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE')
//web3.eth.defaultAccount = '0xD860888A3388a8332ecF7658e021E68962dED350';
//console.log()
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log(web3.eth.defaultAccount)
console.log(web3.eth.accounts.wallet[0]);
console.log(web3.utils.checkAddressChecksum(web3.eth.defaultAccount));
console.log(web3.eth.Iban.isValid(web3.eth.defaultAccount));
console.log(web3.utils.isAddress(web3.eth.defaultAccount));
var instance = new web3.eth.Contract(contractABI,contractAddress);
 

var privateKey = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';

// var obj = {
//   to : contractAddress,
//   data : instance.methods.ownershipChange(web3.utils.asciiToHex("ac_01"),web3.utils.asciiToHex("us_02"),321).encodeABI(),
//   gas : 4700000
// }
// web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
//     console.log(res);
//     web3.eth.sendSignedTransaction(res.rawTransaction,(err,result)=>{
//         console.log(result);
//     })
// })

instance.methods.getAssetData(web3.utils.asciiToHex("\"5c76848e46628c7306f9f128\"")).call({gas:9000000},(err,res)=>{
  var history = [];
  for(let i=0;i<res[0].length;i++){
    history.push({owner : web3.utils.hexToAscii(res[0][i]), date : new Date((res[2][i])*1000) });
  }
  console.log(history);
})










// instance.methods.setAssetData(web3.utils.asciiToHex("us_01"),web3.utils.asciiToHex("ac_01"),123,web3.utils.asciiToHex("buy"),310000,web3.utils.asciiToHex("one plus 5T"))
// .send({from:"0xD860888A3388a8332ecF7658e021E68962dED350",gas:600000},(error,transactionHash)=>{
//     console.log(transactionHash);
//     console.log(error);
// })

// instance.methods.setAssetData.call("1","ac_01",123,"buying",310000,"One Plus 5T",{from:web3.eth.accounts[0],gas:4700000},(err,res)=>{

//     console.log(res);
// });
// var val1 = web3.utils.utf8ToHex("1");
// console.log(web3.utils.utf8ToHex("1"));
// instance.methods.setAssetData(web3.utils.fromAscii("1"),web3.utils.fromAscii("ac_01"),123,web3.utils.fromAscii("buying"),310000,web3.utils.fromAscii("One Plus 5T")).send({from:'0xD860888A3388a8332ecF7658e021E68962dED350',gas:4700000}).then((transactionHash)=>{
//     console.log(transactionHash);
// })


//var res = instance.methods.setAssetData(web3.utils.bytesToHex("1"),web3.utils.bytesToHex("ac_01"),123,web3.utils.bytesToHex("buying"),310000,web3.utils.bytesToHex("One Plus 5T"),{from:'0xD860888A3388a8332ecF7658e021E68962dED350',gas:4700000})



// var obj ={
//     to : '0x0A60cE905BaEdA4347AfFb0cA5bc36baAe434f8C',
//     data: instance.methods.setAssetData(web3.utils.asciiToHex("us_01"),web3.utils.asciiToHex("ac_01"),123,web3.utils.asciiToHex("buy"),310000,web3.utils.asciiToHex("one plus 5T")).encodeABI(),
//     gas : 400000,
// }

// var privateKey = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';

// web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
//     console.log(res);
//     web3.eth.sendSignedTransaction(res.rawTransaction,(err,result)=>{
//         console.log(result);
//     })
// })