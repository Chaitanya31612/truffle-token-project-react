const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const MyKycContract = artifacts.require("KycContract");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS); // 1 million tokens
  await deployer.deploy(MyKycContract);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    MyToken.address,
    MyKycContract.address
  ); // (1, addr[0], MyToken.address) -> (1wei = 1TKNbits, owner, token address)
  // transfer all the tokens from MyToken to MyTokenSale smart contract for redistribution
  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
