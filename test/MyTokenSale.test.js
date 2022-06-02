const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");

const chai = require("./setupchai");
const BN = web3.utils.BN; // BN - Big Number
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("TokenSale test", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it("should not have any tokens in my deployerAccount", async () => {
    let instance = await Token.deployed();
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all tokens should be in TokenSale contract by default", async () => {
    let instance = await Token.deployed();
    return expect(
      instance.balanceOf(await TokenSale.address)
    ).to.eventually.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS));
  });

  it("should be possible to buy tokens", async () => {
    // let tokenInstance = await Token.deployed();
    // let tokenSaleInstance = await Token.deployed();
    // let balanceBefore = await tokenInstance.balanceOf(deployerAccount); // previous amount in tokenInstance smart contract for deployerAccount
    // expect(
    //   tokenSaleInstance.sendTransaction({
    //     value: web3.utils.toWei("1", "wei"),
    //     from: deployerAccount,
    //   })
    // ).to.eventually.be.fulfilled;
    // return expect(
    //   tokenInstance.balanceOf(deployerAccount)
    // ).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
  });
});
