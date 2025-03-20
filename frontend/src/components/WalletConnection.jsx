import React from "react";
import styles from "./WalletConnection.module.css"; // Ensure appropriate styles are defined

function WalletConnection({ account, connectWallet, disconnectWallet }) {
  return (
    <div>
      {account ? (
        <button
          className={`${styles.walletButton} ${styles.disconnectButton}`}
          onClick={disconnectWallet}
        >
          <i className="fas fa-power-off"> </i>{` Account ...${account.address.slice(-5)}`}
          
        </button>
      ) : (
        <button
          className={`${styles.walletButton} ${styles.connectButton}`}
          onClick={connectWallet}
        >
          <i className="fas fa-plug"></i> Connect Wallet
        </button>
      )}
    </div>
  );
}

export default WalletConnection;
