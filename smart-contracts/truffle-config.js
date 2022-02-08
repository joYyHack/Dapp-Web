const WalletProvider = require("@truffle/hdwallet-provider");
const PK = ["e7ea3fcdf33df14a94fb4f89c9a5d02d0b6d58497abbb51382a2b189dc304d87"];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function () {
        return new WalletProvider(PK, "https://ropsten.infura.io/v3/9ba73f6719c64bf9bad0264d1983c4df");
      },
      network_id: 3,
    },
  },
  contracts_directory: "./contracts",
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
