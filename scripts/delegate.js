const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [owner] = await ethers.getSigners();
    const governor = await ethers.getContractAt("CrimeanGovernor", process.env.GOV_CONTRACT_ADDR);
    const token = await ethers.getContractAt("CrimeanToken", process.env.TOKEN_CONTRACT_ADDR);

    console.log(
        `Governor contract address: ${governor.address}`,
        `\nToken contract address: ${token.address}`
    );

    const tx = await token.delegate(owner.address);

    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === "DelegateChanged");
    const { delegator, fromDelegate, toDelegate } = event.args;

    console.log(`event DelegateChanged(delegator: ${delegator}, fromDelegate: ${fromDelegate}, toDelegate: ${toDelegate})`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
