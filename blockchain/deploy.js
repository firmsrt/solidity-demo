const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/ProductFactory.json');

const provider = new HDWalletProvider(
  'tray flee plate armor pottery ski upset remove hazard pulp behave exhibit',
  'https://rinkeby.infura.io/v3/196ecab02424439bad1d78896e874bdb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attemp deploy contract from account ' + accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.interface)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });

  console.log("Contract deploy to ", result.options.address);
}

deploy();