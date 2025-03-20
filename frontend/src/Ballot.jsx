import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ballot from "./utils/ballotABI.json";
import Header from "./components/Header";
import WalletConnection from "./components/WalletConnection";
import ProposalList from "./components/ProposalList";
import AddProposal from "./components/AddProposal";
import Style from "./Ballot.module.css";

const ballotAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Ballot() {
  const [proposals, setProposals] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
      setContract(new ethers.Contract(ballotAddress, ballot.abi, signer));
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
  };

  useEffect(() => {
    const loadProposals = async () => {
      try {
        //const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const readOnlyContract = new ethers.Contract(ballotAddress, ballot.abi, provider);

        const proposalsArray = await readOnlyContract.getProposals();
        const formattedProposals = await Promise.all(
          proposalsArray.map(async (proposal, index) => {
            const hasVoted = account
              ? await readOnlyContract.hasVoted(account, index)
              : false;

            return {
              id: index,
              name: ethers.decodeBytes32String(proposal.name),
              votes: proposal.voteCount.toString(),
              hasVoted,
            };
          })
        );

        setProposals(formattedProposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    loadProposals();
  }, [account]);

  const vote = async (proposalIndex) => {
    if (!contract) {
      alert("Please connect your wallet to vote.");
      return;
    }

    try {
      const tx = await contract.vote(proposalIndex);
      await tx.wait();
      alert(`Voted successfully for proposal ${proposalIndex}`);

      const proposalsArray = await contract.getProposals();
      const formattedProposals = await Promise.all(
        proposalsArray.map(async (proposal, index) => {
          const hasVoted = await contract.hasVoted(account, index);

          return {
            id: index,
            name: ethers.decodeBytes32String(proposal.name),
            votes: proposal.voteCount.toString(),
            hasVoted,
          };
        })
      );

      setProposals(formattedProposals);
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  const addProposal = async (newProposal) => {
    if (!contract) {
      alert("Please connect your wallet to add proposal.");
      return;
    }
    try {
      // Check if a valid proposal name is entered
      if (!newProposal.trim()) {
        alert("Please enter a valid proposal name.");
        return;
      }
  
      // Add the new proposal to the contract
      const tx = await contract.addProposal(ethers.encodeBytes32String(newProposal));
      await tx.wait();
      alert("Proposal added successfully!");
  
      // Fetch updated proposals including the new one
      const proposalsArray = await contract.getProposals();
      const formattedProposals = await Promise.all(
        proposalsArray.map(async (proposal, index) => {
          const hasVoted = await contract.hasVoted(account, index); // Check if the connected wallet has voted
          return {
            id: index,
            name: ethers.decodeBytes32String(proposal.name),
            votes: proposal.voteCount.toString(),
            hasVoted, // Update the voting status
          };
        })
      );
  
      // Update state with the new proposals and their hasVoted status
      setProposals(formattedProposals);
    } catch (error) {
      console.error("Error adding proposal:", error);
    }
  };
  
  
  return (
    <div>
      <div className={Style.container}>
        <Header />
        <WalletConnection
          account={account}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />
      </div>
      <ProposalList proposals={proposals} vote={vote} />
      {/* AddProposal logic*/}
      <AddProposal addProposal={addProposal} />
      
    </div>
  );
}

export default Ballot;
