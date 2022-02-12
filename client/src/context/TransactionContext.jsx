import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { TransactionsContractAddr, TransactionsABI, AGTempAddr, AGAddr } from "../utils/constants";

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

      const accounts = await ethereum.request({ method: "eth_accounts" });
      accounts.length && setCurrentConnectedAccount(accounts[0]);

      if (accounts.length) console.log(`Your wallet is connected.\nYour current connected account is: ${accounts[0]}`);
      else throw "You have no accounts connected. Try to connect your wallet using connectWallet() function!";

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const connectWallet = async () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => console.log(accounts))
      .catch((err) => {
        if (err.code === 4001) return console.log(`Please connect to MetaMask. Error description:\n${err}`);
        else return console.error(err);
      });
  };

  useEffect(async () => {
    await checkIfMetaMaskIsInstalledAndConnected();
  }, []);

  //Function which updates transaction data in form on each symbol update(I SUPPOSE :D)
  const handleChange = (e, name) => {
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
    <TransactionContext.Provider value={{ connectWallet, currentConnectedAccount, transactionData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
