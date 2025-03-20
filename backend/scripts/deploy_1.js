const hre = require("hardhat");

async function main() {
  const proposals = ["0x5465737400000000000000000000000000000000000000000000000000000000"];
  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(proposals);

  //await Ballot.deploy();
  console.log(`Ballot deployed to: ${ballot.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
