require('dotenv').config()
 const { TruffleProvider } = require('@harmony-js/core')
 //Local
 const local_mnemonic = process.env.LOCAL_MNEMONIC
 const local_private_key = process.env.LOCAL_PRIVATE_KEY
 const local_url = process.env.LOCAL_0_URL;
 //Testnet
 const testnet_mnemonic = process.env.TESTNET_MNEMONIC
 const testnet_private_key = process.env.TESTNET_PRIVATE_KEY
 const testnet_url = process.env.TESTNET_0_URL
 //Mainnet
 const mainnet_mnemonic = process.env.MAINNET_MNEMONIC
 const mainnet_private_key = process.env.MAINNET_PRIVATE_KEY
 const mainnet_url = process.env.MAINNET_O_URL

//  const ropsten_mnemonic = process.env.ROPSTEN_MNEMONIC
 //const testnet_0_url = process.env.TESTNET_0_URL
 //const testnet_1_url = process.env.TESTNET_1_URL
 const matic_mnemonic = "teach manual bleak process awkward garlic load taste since want alpha benefit";

 const HDWalletProvider = require("truffle-hdwallet-provider");

 
 //GAS - Currently using same GAS accross all environments
 gasLimit = process.env.GAS_LIMIT
 gasPrice = process.env.GAS_PRICE
 
 module.exports = {
   networks: {
     local: {
       network_id: '2', 
       provider: () => {
         const truffleProvider = new TruffleProvider(
           local_url,
           { memonic: local_mnemonic },
           { shardID: 0, chainId: 2 },
           { gasLimit: gasLimit, gasPrice: gasPrice},
         );
         const newAcc = truffleProvider.addByPrivateKey(local_private_key);
         truffleProvider.setSigner(newAcc);
         return truffleProvider;
       },
     },
     development: {
      host: "localhost",
      port: 7545,
      network_id: "5777"
      },
     testnet: {
       network_id: '2', 
       provider: () => {
         const truffleProvider = new TruffleProvider(
           testnet_url,
           { memonic: testnet_mnemonic },
           { shardID: 0, chainId: 2 },
           { gasLimit: gasLimit, gasPrice: gasPrice},
         );
         const newAcc = truffleProvider.addByPrivateKey(testnet_private_key);
         truffleProvider.setSigner(newAcc);
         return truffleProvider;
       },
     },
     mainnet: {
      network_id: '1', 
      provider: () => {
        const truffleProvider = new TruffleProvider(
          mainnet_url,
          { memonic: mainnet_mnemonic },
          { shardID: 0, chainId: 1 },
          { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        const newAcc = truffleProvider.addByPrivateKey(mainnet_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
      gasPrice: 100000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(matic_mnemonic, "https://ropsten.infura.io/v3/be24cc468e9c4e839030c2779f0e4052")
      },
      network_id: 3,
      // gas: 4000000,      //make sure this gas allocation isn't over 4M, which is the max
      // gasPrice: gasPrice
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(matic_mnemonic, "https://rinkeby.infura.io/v3/be24cc468e9c4e839030c2779f0e4052")
      },
      network_id: 4,
      gas: 4000000,      //make sure this gas allocation isn't over 4M, which is the max
      gasPrice: gasPrice
    },
    matic: {
      provider: () => new HDWalletProvider(matic_mnemonic, `https://rpc-mumbai.maticvigil.com/v1/e310bd27810b2c00cc05b39910f443e946c279da`),
      network_id: 80001,
      confirmations: 2,
      gasPrice: '1000000000',
      timeoutBlocks: 200,
      skipDryRun: true,
    },
   },
   contracts_directory: './contracts/',
   contracts_build_directory: './build/contracts/',
};
