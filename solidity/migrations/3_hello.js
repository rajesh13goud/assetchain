var Migrations = artifacts.require("./Hello.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
