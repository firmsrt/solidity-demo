const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const productFactory = require('../blockchain/build/ProductFactory.json');
const compiledProduct = require('../blockchain/build/Product.json');

let productAddress;
let product;

beforeEach(async ()=> {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(productFactory.interface)
      .deploy({ data: productFactory.bytecode })
      .send({ from: accounts[0], gas: '2000000' });
  
    await factory.methods.createProduct('ProductName1', 'ProductDesc', web3.utils.toWei('1', 'ether'), 100).send({
      from: accounts[0],
      gas: '1000000'
    });

    [productAddress] = await factory.methods.getDeployedProducts().call();

    console.log('Create product success, address = ' + productAddress);

    product = await new web3.eth.Contract(
        compiledProduct.interface,
        productAddress
    );
});

describe('Product', () => {
    it('deploys a factory and product', () => {
        assert.ok(factory.options.address);
        assert.ok(product.options.address);
    });
});