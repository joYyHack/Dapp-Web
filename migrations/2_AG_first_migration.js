const AGFirstContract = artifacts.require("AGFirstContract");

module.exports = function (deployer) {
  deployer.deploy(AGFirstContract);
};
