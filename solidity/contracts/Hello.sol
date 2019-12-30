pragma solidity ^0.5.0;


contract Hello {
  // constructor() public {
  // }

  uint hell = 23;

  function sayHello() public pure returns(bytes32 val){
    val = "Hello Boi";
  }

  function changeHello(uint change) public returns(uint){
    hell = change;
    return hell;
  }
  function returnHell() public view returns(uint){
      return hell;
  }
}
