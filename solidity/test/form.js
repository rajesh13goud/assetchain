const web3 = require('./deatTest');
const {Pool, Client} = require('pg')
// const log = require('./signin');


const pool = new Pool({
    user:"property",
    host:"localhost",
    database:"property",
    password:"rajesh123",
    port:5432
})

// let content = data;
pool.connect();
let price = 67;
pool.query("SELECT assetid from invoiced where price = ($1)",
[price],(err,res) =>{
    if(err){
        console.log(err);
    }else {
        console.log('here ir is', res);
    }
data = {
    assetId: 1,
    price: 1000,
    userId: '0xe340c19cB05D6A437320174175d940BA0dF908a3'
}
console.log("data getting into bc " + JSON.stringify(data));
web3.buyItem(data , (result) =>{
    if(result == err){
        var data = {
            status: "error",
            message: "couldn't add to blockchain"
        }
        return res.JSON(data);
    }
    console.log("we need: " + JSON.stringify(result));
    
})
web3.withDraw((result)=>{
    console.log('withdrew', result);
})

})