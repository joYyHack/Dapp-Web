const AGFirstContract = artifacts.require("AGSecondContract");

module.exports = function (deployer) {
  deployer.deploy(AGFirstContract);
};
