const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));

var contractAddress = '0x88bfA7168067f9A26927904Ce29C292993cBC77B';
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
        "type": "bytes32"
      }
    ],
    "name": "ownerShipChange",
    "type": "event",
    "signature": "0x3a28a084357a1cf3d381c66f089e0ab35a2edab114ee744852efc3a8058dad00"
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
        "type": "bytes32"
      }
    ],
    "name": "maintenance",
    "type": "event",
    "signature": "0x2ebbdc154167246a5fe681de37dc68dc62542e8af650431cd8771a1132896cea"
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
        "type": "bytes32"
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
    "signature": "0x3feeac59"
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
        "type": "bytes32[]"
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
        "type": "bytes32"
      }
    ],
    "name": "ownershipChange",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2282d995"
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
        "type": "bytes32"
      }
    ],
    "name": "service",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc2accc89"
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
        "type": "bytes32[]"
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
var instance = new web3.eth.Contract(contractABI,contractAddress);
var privateKey = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';
function setDataBC(data,callback){
    
    var BCdata = {};
    let obj = {
        to : contractAddress,
        data : instance.methods.setAssetData(web3.utils.asciiToHex(data.user_id),web3.utils.asciiToHex(data.asset_id),web3.utils.asciiToHex(data.date),web3.utils.asciiToHex(data.act),data.price,web3.utils.asciiToHex(data.desc)).encodeABI(),
        gas : 4700000
    }
    
    web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
      if(err){
        console.log(err);
        return callback(err);
      }
    web3.eth.sendSignedTransaction(res.rawTransaction)
    .once('transactionHash',function(hash){console.log(hash)})
    .on('error',function(error){callback(error)})
    .then(function(receipt){
      BCdata.blockHash = receipt.blockHash;
      BCdata.blockNumber = web3.utils.hexToNumber(receipt.blockNumber);
      BCdata.transactionHash = receipt.logs[0].transactionHash;
      BCdata.gasUsed = web3.utils.hexToNumber(receipt.cumulativeGasUsed);
      console.log(receipt);
      BCdata.contract = receipt.logs[0].address;
      console.log(receipt.logs[0].transactionHash);
      callback(BCdata);
    })
})
}


function getDataBC(assetId,callback){
    instance.methods.getAssetData(web3.utils.asciiToHex(assetId)).call({gas:9000000},(err,res)=>{
    var history = [];
    for(let i=0;i<res[0].length;i++){
    history.push({owner : web3.utils.hexToAscii(res[0][i]), date : web3.utils.hexToAscii(res[2][i])});
    }
    callback(history);
    })
}


 function setMaintenanceBC(data){
     let obj ={
         to : contractAddress,
         data : instance.methods.service(web3.utils.asciiToHex(data.assetId),web3.utils.asciiToHex(data.desc),web3.utils.asciiToHex(data.date)).encodeABI(),
         gas : 4700000
     }
     web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
         web3.eth.sendSignedTransaction(res.rawTransaction,(err,result)=>{
         callback(result.transactionHash);
        })
    })
 }

  function getMaintenanceBC(assetId,callback){
      instance.methods.maintenanceHistory(assetId).call({gas: 4700000},(err,res)=>{
          var maintenance = [];
          for(let i=0;i<res.length;i++){
              maintenance.push({description : web3.utils.hexToAscii(res[0][i]),date : web3.utils.asciiToHex(res[1][i]),owner : web3.utils.hexToAscii(res[2][i])})
          }
      })
  }

  exports.setDataBC = setDataBC;
  exports.getDataBC = getDataBC;
  exports.setMaintenanceBC = setMaintenanceBC;
  exports.getMaintenanceBC = getMaintenanceBC;