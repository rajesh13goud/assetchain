// const Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));

const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));
const account = "0xe340c19cB05D6A437320174175d940BA0dF908a3"
// var account = '0xE37a50Da0dd19CbaE4E2b368ac1C66b3CF232391';
web3.eth.getBalance(account, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    // console.log(balance);
  })

  const abi = [
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

//   const address = '0xbe1586d34fc174090472e75dE7e6A16A2A3179fd';
const address = '0xE37a50Da0dd19CbaE4E2b368ac1C66b3CF232391';
  const contract = new web3.eth.Contract(abi, address);
//   console.log('working', contract);
contract.methods.getItems().call((err, res)=>{
    console.log('res',res)
})