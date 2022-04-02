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

    console.log("Transaction smart contract data:");
    console.log({ Address: contract._address, JsonInterface: contract._jsonInterface });
    return contract;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [currentConnectedAccount, setCurrentConnectedAccount] = useState("");
  const [transactionData, updateTransactionData] = useState({
    toAddress: "0xc34cbC0B281A2De72612a1B715AE5bd9788fc38B",
    amount: "123",
    keyword: "123",
    message: "123",
  });

  const checkIfMetaMaskIsInstalledAndConnected = async (showLog = true) => {
    try {
      if (!EthereumProvider) throw "Please install MetaMask!";
      if (EthereumProvider !== window.ethereum) throw "Do you have multiple wallets installed?";

      showLog && console.log("MetaMask is installed!");

      if (ethereum.isConnected()) {
        ethereum
          .request({ method: "eth_chainId" })
          .then((chainId) => showLog && console.log(`Chain ID: ${chainId}`))
          .catch((err) => console.log(`Error on 'eth_chainId': ${err}`));
      }

      const accounts = await ethereum.request({ method: "eth_accounts" }).catch((err) => console.log(`Error on eth_accounts: ${err}`));
      accounts.length && setCurrentConnectedAccount(accounts[0]);

      if (accounts.length) showLog && console.log(`Wallet is connected.\nYour current connected account is: ${accounts[0]}`);
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
      if (await checkIfMetaMaskIsInstalledAndConnected(false)) {
        console.log("Started transaction...");

        const { toAddress, amount, keyword, message } = transactionData;

        const transactionContract = GetTransactionsContract();

        if (!transactionContract) throw "transactionContract is null";

        const amountInGwei = Web3.utils.toWei(amount, "ether");

        await transactionContract.methods
          .AddDataToBlockchain(toAddress, amountInGwei, message, keyword)
          .send({ from: currentConnectedAccount })
          .on("transactionHash", (tx) => {
            console.log(`Transaction hash(tx): ${tx}`);
          })
          .on("receipt", (receipt) => {
            console.log("Receipt of transaction:");
            console.log(receipt);
            console.log("Transaction is completed!");
          })
          .on("error", (err) => {
            throw `Error on smart contract function interaction 'AddDataToBlockchain': ${err}`;
          });
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
