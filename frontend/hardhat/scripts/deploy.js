const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  // Use correct Ethers v6 function
  const proposalNames = [
    ethers.encodeBytes32String("Proposal 1"),
    ethers.encodeBytes32String("Proposal 2"),
    ethers.encodeBytes32String("Proposal 3"),
  ];

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(proposalNames);

  console.log("Ballot contract deployed to:", ballot.target); // Use ballot.target instead of ballot.address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
