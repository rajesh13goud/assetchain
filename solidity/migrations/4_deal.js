var Migrations = artifacts.require("./Deal.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
