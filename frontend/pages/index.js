import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // ✅ Prevent SSR
import { useWeb3 } from "../context/Web3Provider";

export async function getStaticProps() {
    // Provide initial static content (empty proposals)
    return {
        props: {
            initialProposals: [], // This ensures the page builds
        },
    };
}

const Home = ({ initialProposals }) => {
    const [proposals, setProposals] = useState(initialProposals);
    const [isClient, setIsClient] = useState(false); // ✅ Fix SSR issue

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { contract } = isClient ? useWeb3() : {}; // ✅ Prevents destructuring error

    const fetchProposals = async () => {
        if (!contract) return;
        const count = await contract.getProposalsCount();
        let loadedProposals = [];
        for (let i = 0; i < count; i++) {
            const proposal = await contract.proposals(i);
            loadedProposals.push({
                name: proposal.name,
                votes: proposal.voteCount.toString(),
            });
        }
        setProposals(loadedProposals);
    };

    if (!isClient) return <p>Loading...</p>; // ✅ Prevents SSR crash

    return (
        <div>
            <h1>Decentralized Voting</h1>
            <button onClick={fetchProposals}>Load Proposals</button>
            <ul>
                {proposals.map((p, index) => (
                    <li key={index}>
                        {p.name} - {p.votes} votes
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ✅ Ensures this component is only rendered on the client side
export default dynamic(() => Promise.resolve(Home), { ssr: false });
