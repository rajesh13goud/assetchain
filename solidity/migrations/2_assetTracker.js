var Migrations = artifacts.require("./assetTracker.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
