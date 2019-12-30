// pragma solidity ^0.5.0;

// contract Deal {
//     address public owner;
//     // address public buyrAddr;
//     mapping(address => uint) public balances;


// struct Item {
// bytes32 ownerid;
// address owner;
// bool forSale;
// uint price;
// }
// mapping(bytes32=>Item) idAssetMap;

// Item[13] public items;

// event ownerChanged(bytes32 AssetId);
// event priceChanged(uint index, uint price);
// event availabilityChanged(uint index, uint price,bool forSale);

// constructor() public {
//     owner = msg.sender;
//     items[0].price = 1000;
//     items[0].forSale = true;
//     items[1].price = 1000;
//     items[1].forSale = true;
//     items[2].price = 1000;
//     items[2].forSale = true;
//     items[3].price = 1000;
//     items[3].forSale = true;
//     items[4].price = 1000;
//     items[4].forSale = true;
//     items[5].price = 1000;
//     items[5].forSale = true;
//     items[6].price = 1000;
//     items[6].forSale = true;
//     items[7].price = 1000;
//     items[7].forSale = true;
//     items[8].price = 1000;
//     items[8].forSale = true;
//     items[9].price = 1000;
//     items[9].forSale = true;
//     items[10].price = 1000;
//     items[10].forSale = true;
//     items[11].price = 1000;
//     items[11].forSale = true;
//     items[12].price = 1000;
//     items[12].forSale = true;

// }
// function itemForSale(uint index, uint price) public {
//     Item storage item = items[index];

//     require(msg.sender == item.owner && price > 0);
    
//     item.forSale = true;
//     item.price = price;
//     emit availabilityChanged(index, price, true);
// }

// function getItems() public view returns(address[] memory, bool[] memory, uint[] memory){
//     address[] memory  addr = new address[](13);
//     bool[] memory available = new bool[](13);
//     uint[] memory price = new uint[](13);

//     for(uint i = 0; i<13; i++){
//         Item storage item = items[i];
//         addr[i] = item.owner;
//         price[i] = item.price;
//         available[i] = item.forSale;
//     }
//     return (addr, available, price);
// }

// function buyItem(uint) public payable{
//     Item storage item = items[index];
//     // idAssetMap[AssetId].ownerid = AssetId;

//     require(msg.sender != item.owner && item.forSale && msg.value >= item.price);

//     if(address(item.owner) == address(0x0)){
//         balances[owner] +=msg.value;
//     } else{
//         balances[item.owner] += msg.value;
//     }
//     item.owner =msg.sender;
//     item.forSale = false;

//     emit ownerChanged(AssetId);
// }

// function withDraw() public  payable{
//     address payable payee = msg.sender;
//     uint payment = balances[payee];

//     require(payment > 0);

//     balances[payee] = 0;
//     require(payee.send(payment));
// }

// function destroy() payable public{
//     address payable owners = msg.sender;
//     require((msg.sender == owners));
//     selfdestruct(owners);
// }
// }
// pragma solidity ^0.5.0;

// contract Deal {
//     address public owner;
//     // address public buyrAddr;
//     address public seller;
//     mapping(address => uint) public balances;


// struct Item {
// address seller;
// address owner;
// bool forSale;
// uint price;
// }

// Item[3] public items;

// event ownerChanged(uint index);
// event priceChanged(uint index, uint price);
// event availabilityChanged(uint index, uint price,bool forSale);

// constructor() public {
//     seller = msg.sender;
//     items[0].price = 1000;
//     items[0].forSale = true;
//     items[1].price = 1000;
//     items[1].forSale = true;
//     items[2].price = 1000;
//     items[2].forSale = true;
// }
// function itemForSale(uint index, uint price) public {
//     Item storage item = items[index];

//     require(msg.sender == item.owner && price > 0);
    
//     item.forSale = true;
//     item.price = price;
//     emit availabilityChanged(index, price, true);
// }

// function getItems() public view returns(address[] memory, bool[] memory, uint[] memory){
//     address[] memory  addr = new address[](3);
//     bool[] memory available = new bool[](3);
//     uint[] memory price = new uint[](3);

//     for(uint i = 0; i<3; i++){
//         Item storage item = items[i];
//         addr[i] = item.owner;
//         price[i] = item.price;
//         available[i] = item.forSale;
//     }
//     return (addr, available, price);
// }

// function buyItem(uint index) public payable{
//     Item storage item = items[index];

//     require(msg.sender != item.seller && item.forSale && msg.value >= item.price);

//     if(address(item.seller) == address(0x0)){
//         balances[owner] +=msg.value;
//     } else{
//         balances[item.owner] += msg.value;
//     }
//     // item.owner =msg.sender;
//     // item.forSale = false;

//     emit ownerChanged(index);
// }

// function sellItem(uint price) public payable{
//     Item storage item = items[price];

//     require(msg.sender == item.owner && price == 1000);
    
//     // item.forSale = true;
//     // item.price = price;
//     // emit availabilityChanged( price, true);
// }

// function withDraw() public  payable{
//     address payable payee = msg.sender;
//     // Item storage item = items[0];
//     uint payment = balances[payee];

//     require(payment > 0);

//     balances[payee] = 0;
//     require(payee.send(payment));
// }

// function destroy() payable public{
//     address payable owners = msg.sender;
//     require((msg.sender == owners));
//     selfdestruct(owners);
// }
// }







pragma solidity ^0.5.0;

contract Deal {
    address public owner;
    address public seller;
    mapping(address => uint) public balances;


struct Item {
address seller;
address owner;
bool forSale;
uint price;
}

Item[3] public items;

event ownerChanged(uint index);
event priceChanged(uint index, uint price);
event availabilityChanged(uint index, uint price,bool forSale);

constructor() public {
    owner = msg.sender;
    items[0].price = 1000;
    items[0].forSale = true;
    items[1].price = 1000;
    items[1].forSale = true;
    items[2].price = 1000;
    items[2].forSale = true;
}
function itemForSale(uint index, uint price) public {
    Item storage item = items[index];

    require(msg.sender == item.owner && price > 0);
    
    item.forSale = true;
    item.price = price;
    emit availabilityChanged(index, price, true);
}

function getItems() public view returns(address[] memory, bool[] memory, uint[] memory){
    address[] memory  addr = new address[](3);
    bool[] memory available = new bool[](3);
    uint[] memory price = new uint[](3);

    for(uint i = 0; i<3; i++){
        Item storage item = items[i];
        addr[i] = item.seller;
        price[i] = item.price;
        available[i] = item.forSale;
    }
    return (addr, available, price);
}

function buyItem(uint index) public payable{
    Item storage item = items[index];

    require(msg.sender != item.owner && item.forSale && msg.value >= item.price);

    if(address(item.seller) == address(0x0)){
        balances[seller] +=msg.value;
    } else{
        balances[item.seller] += msg.value;
    }
    item.seller =msg.sender;
    item.forSale = false;

    emit ownerChanged(index);
}

function withDraw() public  payable{
    address payable payee = msg.sender;
    
    uint payment = balances[payee];

    require(payment > 0);

    balances[payee] = 0;
    require(payee.send(payment));
}
function sell(uint index) public{
    Item storage item = items[index];
    item.forSale = true;
    seller = msg.sender;
}
function destroy() payable public{
    address payable owners = msg.sender;
    require((msg.sender == owners));
    selfdestruct(owners);
}
}
