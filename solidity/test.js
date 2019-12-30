const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// let contractABI = [
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "name": "assetId",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "ownerId",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "assetPrice",
//           "type": "uint256"
//         }
//       ],
//       "name": "addedAsset",
//       "type": "event",
//       "signature": "0x5c1e837527a537c546d296ae07453f8e749a9edd69e8d15683b0845ad7ce08e9"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "name": "assetId",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "owner",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "dates",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownerShipChange",
//       "type": "event",
//       "signature": "0xbaf11817d026af2ea3df46905052aa09641be7bd10a7d400297161c383e77525"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "name": "assetId",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "maintenanceDesc",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "maintainer",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "name": "date",
//           "type": "uint256"
//         }
//       ],
//       "name": "maintenance",
//       "type": "event",
//       "signature": "0x5f62b28e23eec39aaf1d3ca8a2fd8cb345a10f23e21023523365bd09741ef4e6"
//     },
//     {
//       "constant": false,
//       "inputs": [
//         {
//           "name": "userId",
//           "type": "bytes32"
//         },
//         {
//           "name": "Assetid",
//           "type": "bytes32"
//         },
//         {
//           "name": "activityDate",
//           "type": "uint256"
//         },
//         {
//           "name": "presentAct",
//           "type": "bytes32"
//         },
//         {
//           "name": "assetPrice",
//           "type": "uint256"
//         },
//         {
//           "name": "aName",
//           "type": "bytes32"
//         }
//       ],
//       "name": "setAssetData",
//       "outputs": [
//         {
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function",
//       "signature": "0x9b455c20"
//     },
//     {
//       "constant": true,
//       "inputs": [
//         {
//           "name": "Assetid",
//           "type": "bytes32"
//         }
//       ],
//       "name": "getAssetData",
//       "outputs": [
//         {
//           "name": "owner",
//           "type": "bytes32[]"
//         },
//         {
//           "name": "assetHistory",
//           "type": "uint256[]"
//         },
//         {
//           "name": "activityHistory",
//           "type": "bytes32[]"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function",
//       "signature": "0x5197759b"
//     },
//     {
//       "constant": false,
//       "inputs": [
//         {
//           "name": "Assetid",
//           "type": "bytes32"
//         },
//         {
//           "name": "newOwnerid",
//           "type": "bytes32"
//         },
//         {
//           "name": "date",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownershipChange",
//       "outputs": [
//         {
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function",
//       "signature": "0x55f6d7c4"
//     },
//     {
//       "constant": false,
//       "inputs": [
//         {
//           "name": "Assetid",
//           "type": "bytes32"
//         },
//         {
//           "name": "maintenanceInfo",
//           "type": "bytes32"
//         },
//         {
//           "name": "date",
//           "type": "uint256"
//         }
//       ],
//       "name": "service",
//       "outputs": [
//         {
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function",
//       "signature": "0xf756b36c"
//     },
//     {
//       "constant": true,
//       "inputs": [
//         {
//           "name": "AssetId",
//           "type": "bytes32"
//         }
//       ],
//       "name": "maintenanceHistory",
//       "outputs": [
//         {
//           "name": "desc",
//           "type": "bytes32[]"
//         },
//         {
//           "name": "dates",
//           "type": "uint256[]"
//         },
//         {
//           "name": "owners",
//           "type": "bytes32[]"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function",
//       "signature": "0x0ec51ba0"
//     }
// ];

var contractABI = [
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
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
// let contractAddress ='0xa8aba88f9364ffd8dd71388b09915f6d7d102175 ';
var contractAddress = '0xbe1586d34fc174090472e75dE7e6A16A2A3179fd';



let instance = new web3.eth.Contract(contractABI, contractAddress);
let plotId = 0;
let price = 1000;
let res = instance.methods.buyItem(plotId).send({value: price, from:'0xaEE5d61b09dD9461095858e23A8c49463579c88D'}) //({from:web3.eth.accounts[0],value: web3.utils.toWei('1','ether'), gas: 4700000});
console.log('hetre',res);
//let res = instance.setAssetData("1","ac_01",123,"buying",310000,"One Plus 5T",{from:web3.eth.accounts[0],gas:4700000});

// let res = instance.getAssetData("ac_01");
// console.log(res);
// //console.log((res[0][0]).toNumber())
// console.log((web3.toAscii(res[0][0])));
// console.log(web3.toAscii(res[0][1]));
// console.log((res[1][0]).toNumber());
// console.log((res[1][1]).toNumber());
// // //console.log(web3.toAscii(res[2]));
// console.log(web3.toAscii(res[2][0]));
// console.log(web3.toAscii(res[2][1]));

//let res = instance.ownershipChange("ac_01","2",1456,{from:web3.eth.accounts[0],gas:4700000});

//console.log(res);

//instance.service("ac_01","New Screen",321,{from:web3.eth.accounts[0],gas:4700000});

// var res =instance.maintenanceHistory("ac_01");

// console.log(web3.toAscii(res[0][0]));
// console.log((res[1][0]).toNumber());