const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const CrimeanGovernor = await ethers.getContractFactory("CrimeanGovernor");
  const governor = await CrimeanGovernor.deploy(futureAddress);

  const CrimeanToken = await ethers.getContractFactory("CrimeanToken");
  const token = await CrimeanToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `\nToken deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
