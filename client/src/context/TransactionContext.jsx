import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { TransactionsContractAddr, TransactionsABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const ethereumProvider = await detectEthereumProvider();

const getTransactionsContract = () => {
  const web3 = new Web3(ethereumProvider);
  const contract = new web3.eth.Contract(TransactionsContractAddr, TransactionsABI);

  console.log({
    ethereumProvider,
    contract,
  });
};

export const TransactionContextProvider = ({ children }) => {
  const checkIfMetaMaskIsInstalled = async () => {
    if (!ethereumProvider) return alert("Please install MetaMask!");
    if (ethereumProvider !== window.ethereum) return alert("Do you have multiple wallets installed?");

    console.log(`MetaMask is installed!\nYour provider -> ethereumProvider`);

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(`Your Accounts:\n ${accounts}`);
  };

  const connectWallet = async () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => console.log(accounts))
      .catch((err) => {
        if (err.code === 4001) return console.log("Please connect to MetaMask");
        else return console.error(err);
      });
  };

  useEffect(() => {
    checkIfMetaMaskIsInstalled();
  }, []);

  return <TransactionContext.Provider value={{ connectWallet }}>{children}</TransactionContext.Provider>;
};
