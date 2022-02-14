import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { TransactionsContractAddr, TransactionsABI, AGTempAddr, AGAddr } from "../utils/constants";
import { BsWindowSidebar } from "react-icons/bs";

export const TransactionContext = React.createContext();

const EthereumProvider = await detectEthereumProvider();

const GetTransactionsContract = () => {
  try {
    const web3 = new Web3(EthereumProvider);
    const contract = new web3.eth.Contract(TransactionsABI, TransactionsContractAddr);

    console.log(contract);
    return contract;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [currentConnectedAccount, setCurrentConnectedAccount] = useState("");
  const [transactionData, updateTransactionData] = useState({ toAddress: "", amount: "", keyword: "", message: "" });

  const checkIfMetaMaskIsInstalledAndConnected = async () => {
    try {
      if (!EthereumProvider) throw "Please install MetaMask!";
      if (EthereumProvider !== window.ethereum) throw "Do you have multiple wallets installed?";

      console.log("MetaMask is installed!");

      if (ethereum.isConnected()) {
        ethereum
          .request({ method: "eth_chainId" })
          .then((chainId) => console.log(`Chain ID: ${chainId}`))
          .catch((err) => console.log(`Error on 'eth_chainId': ${err}`));
      }

      const accounts = await ethereum.request({ method: "eth_accounts" }).catch((err) => console.log(`Error on eth_accounts: ${err}`));
      accounts.length && setCurrentConnectedAccount(accounts[0]);

      if (accounts.length) console.log(`Wallet is connected.\nYour current connected account is: ${accounts[0]}`);
      else throw "You have no accounts connected. Try to connect your wallet pressing 'Connect Wallet' button!";

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const connectWallet = async () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        accounts.length && window.location.reload();
      })
      .catch((err) => {
        if (err.code === 4001) return console.log(`Error on eth_requestAccounts: ${err}`);
        else return console.log(`Error on eth_requestAccounts: ${err}`);
      });
  };

  const SetEthereumListeners = () => {
    ethereum.on("disconnect", (err) => {
      console.log(`Wallet was disconnected: ${err}`);
    });

    ethereum.on("accountsChanged", (newAccounts) => {
      if (newAccounts.length) setCurrentConnectedAccount(newAccounts[0]);
      else setCurrentConnectedAccount("");

      console.log(`Account was changed: ${newAccounts[0]}`);
    });

    ethereum.on("chainChanged", (chainId) => window.location.reload());

    console.log("All ethereum listeners are set!");
  };

  useEffect(async () => {
    let connected = await checkIfMetaMaskIsInstalledAndConnected();
    connected && SetEthereumListeners();
  }, []);

  //Function which updates transaction data in form on each symbol update(I SUPPOSE :D)
  const handleTransactionFormChange = (e, name) => {
    updateTransactionData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const sendTransaction = async () => {
    try {
      if (await checkIfMetaMaskIsInstalledAndConnected()) {
        console.log("Started transaction...");

        const { toAddress, amount, keyword, message } = transactionData;

        const transactionContract = GetTransactionsContract();

        if (!transactionContract) throw "transactionContract is null";

        const amountInGwei = Web3.utils.toWei(amount, "ether");

        await transactionContract.methods
          .AddDataToBlockchain(toAddress, amountInGwei, message, keyword)
          .send({ from: currentConnectedAccount }, (err, tx) => {
            if (err) throw err;
            console.log(`tx: ${tx}`); // Transaction hash
          });
        // .on("receipt", (receipt) => {
        //   console.log(`receipt: ${JSON.stringify(receipt)}`);
        // });

        console.log("Complete");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ connectWallet, currentConnectedAccount, transactionData, handleTransactionFormChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
