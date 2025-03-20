import React, { useState } from "react";
import styles from "./AddProposal.module.css";
function AddProposal({ addProposal }) {
  const [newProposal, setNewProposal] = useState("");

  const handleAddProposal = () => {
    if (newProposal) {
      addProposal(newProposal);
      setNewProposal("");
    }
  };

  return (
    <div>
      <h3>Add New Proposal</h3>
      <input
        className={styles.inputField}
        type="text"
        placeholder="Enter proposal name"
        value={newProposal}
        onChange={(e) => setNewProposal(e.target.value)}
      />
      <button onClick={handleAddProposal}className={styles.addButton} >Add Proposal</button>
    </div>
  );
}

export default AddProposal;
