const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'tray flee plate armor pottery ski upset remove hazard pulp behave exhibit',
  'https://rinkeby.infura.io/v3/2a73aaf722fc45fba4119100aec1590f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attemp deploy contract from account ' + accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deploy to ", result.options.address);
}

deploy();