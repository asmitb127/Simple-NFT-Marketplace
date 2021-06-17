const Crowdsale = artifacts.require("NFTCrowdsale");
const HRC721 = artifacts.require("HRC721");
// const hello = artifacts.require("HelloWorld");

module.exports = function(deployer) {
  deployer.deploy(Crowdsale);
  deployer.deploy(HRC721,"My HRC721", "HRC")
  // deployer.deploy(hello, "AA");
};

