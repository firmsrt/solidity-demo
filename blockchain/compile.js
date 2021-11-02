const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const productPath = path.resolve(__dirname, "contracts", "Product.sol");
const source = fs.readFileSync(productPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'Product.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

fs.ensureDirSync(buildPath);
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
} else {
    const contracts = output.contracts["Product.sol"];
    for (let contractName in contracts) {
        const contract = contracts[contractName];
        var contractJson = {
            interface: contract.abi,
            bytecode: contract.evm.bytecode.object
        }
        fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contractJson), 'utf8');
    }
}
