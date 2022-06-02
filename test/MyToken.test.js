const Token = artifacts.require("MyToken");

const chai = require("./setupchai");
const BN = web3.utils.BN; // BN - Big Number
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("Token test", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("is not possible to send tokens more than available in total", async () => {
    let instance = this.myToken;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipient, new BN(balanceOfDeployer) + new BN(1)))
      .to.eventually.be.rejected;
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });

  it("all tokens should be in my account", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    // let balance = await instance.balanceOf(accounts[0]);
    // expect(balance).to.be.bignumber.equal(totalSupply);
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("is possible to send tokens between accounts", async () => {
    // let sendTokens = 1;
    // let instance = this.myToken;
    // let totalSupply = await instance.totalSupply();
    // expect(
    //   instance.balanceOf(deployerAccount)
    // ).to.eventually.be.a.bignumber.equal(totalSupply);
    // expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    // expect(
    //   instance.balanceOf(deployerAccount)
    // ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    // return expect(
    //   instance.balanceOf(recipient)
    // ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });
});
