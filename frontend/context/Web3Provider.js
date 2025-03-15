import { createContext, useContext, useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import Ballot from "../hardhat/artifacts/contracts/Voting.sol/Ballot.json";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) { // ✅ Check for window
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(web3Provider);

            const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
            const signer = web3Provider.getSigner();
            const contractInstance = new Contract(contractAddress, Ballot.abi, signer);
            setContract(contractInstance);
        }
    }, []);

    return (
        <Web3Context.Provider value={{ provider, contract }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
