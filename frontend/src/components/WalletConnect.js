import React, { useState } from 'react';
import Web3 from 'web3';

function WalletConnect() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
  };

  return (
    <button onClick={connectWallet}>
      {account ? `Connected: ${account.slice(0,6)}...` : 'Connect Wallet'}
    </button>
  );
}

export default WalletConnect;
