import React from "react";
import styles from "./ProposalList.module.css";

function ProposalList({ proposals, vote }) {
  return (
    <div className={styles.proposalsContainer}>
      {proposals.map((proposal) => (
        <div key={proposal.id} className={styles.card}>
          <div className={styles.proposalTitle}>{proposal.name}</div>
          <div className={styles.proposalVotes}>Votes: {proposal.votes}</div>
          <button
            onClick={() => !proposal.hasVoted && vote(proposal.id)} // Only allow voting if not already voted
            className={`${styles.voteButton} ${
              proposal.hasVoted ? styles.green : styles.grey
            }`}
            disabled={proposal.hasVoted} // Disable button if already voted
          >
            {proposal.hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProposalList;
