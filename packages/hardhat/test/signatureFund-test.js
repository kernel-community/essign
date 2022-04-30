const { expect } = require("chai");
const { ethers } = require("hardhat");

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";

describe("SignatureFund", function () {
    beforeEach(async function () {
        const SignatureFund = await ethers.getContractFactory("SignatureFund");
        const WETH = await ethers.getContractFactory("WETH");
        const [deployer, creator, alice] = await ethers.getSigners();
        this.deployer = deployer;
        this.creator = creator;
        this.alice = alice;
        this.weth = await WETH.deploy();
        this.signatureFund = await SignatureFund.deploy(PROXY_REGISTRATION_ADDRESS, this.creator.address, this.weth.address);
      });

    describe("Sing", function () {
        it("has correct name and symbol", async function () {
            expect(await this.signatureFund.name()).to.equal("Signature Fund");
            expect(await this.signatureFund.symbol()).to.equal("SING");
          });
        it("should accept donations and allocate correct metadata URIs based on amounts", async function () {
           const creatorBalance = await this.creator.getBalance();
           
           const uri0 = "https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/0/one.mp4";
           const value0 = ethers.utils.parseEther("0.5");
           // A critical learning from this test: only use _strings_, do not pass in numbers
           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: value0 }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("0.5"), 0, uri0);
           expect (await this.signatureFund.tokenURI(0)).to.equal(uri0);
           const creatorBalance0 = await this.creator.getBalance();
           expect(creatorBalance0).to.equal(creatorBalance.add(value0));

           const uri1 = "https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/1/one.mp4";
           const value1 = ethers.utils.parseEther("1.5");
           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: value1 }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("1.5"), 1, uri1);
           expect (await this.signatureFund.tokenURI(1)).to.equal(uri1);
           const creatorBalance1 = await this.creator.getBalance();
           expect(creatorBalance1).to.equal(creatorBalance0.add(value1));

           const uri10 = "https://arweave.net/HhNPw5V8eTrLhbDR1f40_qCwsKjLSnb7bPkI7Ctzhwk/10/one.mp4";
           const value10 = ethers.utils.parseEther("15");
           await expect(this.signatureFund.connect(this.alice).receiveDonation("one", { value: value10 }))
            .to.emit(this.signatureFund, 'DonationReceived')
            .withArgs(this.alice.address, ethers.utils.parseEther("15"), 2, uri10);
           expect (await this.signatureFund.tokenURI(2)).to.equal(uri10);
           const creatorBalance10 = await this.creator.getBalance();
           expect(creatorBalance10).to.equal(creatorBalance1.add(value10));
        })
    })
});