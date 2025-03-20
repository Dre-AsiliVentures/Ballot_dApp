import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ballot from "../utils/ballotABI.json"; // Ensure this path is correct

const ballotAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Deployed contract address
const ballotABI = ballot.abi;

function Ballot() {
  const [proposals, setProposals] = useState([]);
  const [winner, setWinner] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(0);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this app!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account connection
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]); // Set the connected account
      console.log(`Wallet connected`,accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  const disconnectWallet = () => {
    setAccount(null); // Reset the account to null when disconnecting
  };
  

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask to interact with the application!");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Request account connection
        const signer = await provider.getSigner();
        const accounts = await provider.listAccounts();

        const contract = new ethers.Contract(ballotAddress, ballotABI, signer);

        const proposalCount = (await contract.getProposalCount())?.toNumber() || 0; // Ensure your contract exposes this function
        const loadedProposals = [];

        for (let i = 0; i < proposalCount; i++) {
          const proposal = await contract.proposals(i);
          loadedProposals.push(ethers.decodeBytes32String(proposal.name));
        }

        setProposals(loadedProposals);
        setContract(contract);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  const vote = async () => {
    if (contract) {
      try {
        const tx = await contract.vote(selectedProposal);
        await tx.wait();
        alert("Vote cast successfully!");
      } catch (error) {
        console.error("Error casting vote:", error);
      }
    }
  };

  const getWinner = async () => {
    if (contract) {
      try {
        const winnerName = await contract.winnerName();
        setWinner(ethers.decodeBytes32String(winnerName));
      } catch (error) {
        console.error("Error retrieving winner:", error);
      }
    }
  };

  return (
    <div>
      <h2>Ballot Voting System</h2>
      {account ? (
        <button onClick={disconnectWallet}>{account.address}</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <h3>Proposals</h3>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            {proposal.name} - Votes: {proposal.votes}{" "}
            <button onClick={() => vote(proposal.id)}>Vote</button>
          </li>
        ))}
      </ul>
      <h3>Winning Proposal</h3>
      <button onClick={getWinner}>Get Winner</button>
      <p>{winner}</p>
    </div>
  );
}

export default Ballot;
