var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4dca00e02f4849e4b3bd8b9e1fcc1ce1'));

function getGasPrice(callback){
web3.eth.getGasPrice((error,result)=>{
    console.log(result);
    var obj = {
        gasPrice : result,
        txFee : (result*203740)/(Math.pow(10,18))
    }
    //console.log(result.toNumber());
    callback(obj);
})
}


exports.getGasPrice = getGasPrice;