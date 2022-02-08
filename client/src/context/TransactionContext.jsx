import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { TransactionsContractAddr, TransactionsABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const ethereumProvider = await detectEthereumProvider();

const getTransactionsContract = () => {
  if (ethereumProvider) {
    const web3 = new Web3(ethereumProvider);
    const contract = new web3.eth.Contract(TransactionsContractAddr, TransactionsABI);

    console.log({
      ethereumProvider,
      contract,
    });
  } else {
    console.log("Please connect metamask wallet!");
  }
};

export const TransactionContextProvider = ({ children }) => {
  return <TransactionContext.Provider value={{ value: "AG" }}>{children}</TransactionContext.Provider>;
};
