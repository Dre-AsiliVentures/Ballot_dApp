const hre = require("hardhat");

async function main() {
    console.log("Ndio ku-Deploy hii contract...");

    // Get the contract factory
    const Ballot = await hre.ethers.getContractFactory("Ballot");
    
    // Deploy the contract
    const ballot = await Ballot.deploy();


    console.log("Hii contract utaipata hapa:", ballot.target);
}

// Run the script and handle errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
