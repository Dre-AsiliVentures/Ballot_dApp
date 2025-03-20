// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements a simple voting process
 */
contract Ballot {
    //====== State Variables ===================
    address public chairperson;

    // A dynamically-sized array of 'Proposal' structs.
    Proposal[] public proposals;

    // Mapping to keep track of who has voted for each proposal
    mapping(address => mapping(uint => bool)) public votes; // Maps address -> proposal index -> vote status
    //==========================================

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // Short name (up to 32 bytes)
        uint voteCount; // Number of accumulated votes
    }

    /** 
     * @dev Create a new ballot with no initial proposals.
     */
    constructor() {
        // Uncomment this to initialize chairperson if needed
        // chairperson = msg.sender;
    }

    /**
     * @dev Add a new proposal to the ballot. Only the chairperson can add proposals.
     * @param proposalName Name of the new proposal.
     */
    function addProposal(bytes32 proposalName) external {
        // Uncomment this to restrict adding proposals to the chairperson
        // require(msg.sender == chairperson, "Only the chairperson can add proposals.");
        proposals.push(Proposal({
            name: proposalName,
            voteCount: 0
        }));
    }

    /**
     * @dev Returns all proposals with their details.
     * @return An array of proposals with their names and vote counts.
     */
    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    /**
     * @dev Returns the total number of proposals.
     * @return The count of proposals in the `proposals` array.
     */
    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    /**
     * @dev Cast your vote to a proposal.
     * @param proposalIndex Index of the proposal in the proposals array.
     */
    function vote(uint proposalIndex) external {
        require(proposalIndex < proposals.length, "Proposal index out of bounds.");
        require(!votes[msg.sender][proposalIndex], "You have already voted for this proposal.");

        // Mark that the sender has voted for this proposal
        votes[msg.sender][proposalIndex] = true;

        // Increment the vote count for the selected proposal
        proposals[proposalIndex].voteCount += 1;
    }

    /**
     * @dev Checks if a specific address has voted for a given proposal.
     * @param voter Address of the voter.
     * @param proposalIndex Index of the proposal in the proposals array.
     * @return True if the voter has voted for the proposal, otherwise false.
     */
    function hasVoted(address voter, uint proposalIndex) public view returns (bool) {
        require(proposalIndex < proposals.length, "Proposal index out of bounds.");
        return votes[voter][proposalIndex];
    }
}
