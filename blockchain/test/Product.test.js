const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const productFactory = require('../build/ProductFactory.json');
const compiledProduct = require('../build/Product.json');

let productAddress;
let product;
let sellerAddress;

beforeEach(async ()=> {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(productFactory.interface)
      .deploy({ data: productFactory.bytecode })
      .send({ from: accounts[0], gas: '2000000' });
  
    await factory.methods.createProduct('ProductName1', 'ProductDesc', web3.utils.toWei('1', 'ether'), 100).send({
      from: accounts[0],
      gas: '1000000'
    });
    sellerAddress = accounts[0];

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

    it('Get number of deploys products', async () => {
        let num = await factory.methods.getNumberOfDeployedProduct().call();
        assert.equal(num, 1);
    });

    it('Get deploys products', async () => {
      let deployList = await factory.methods.getDeployedProducts().call();
      assert.equal(deployList[0], productAddress);
    });

    it('Get product by seller', async () => {
      let productList = await factory.methods.getProductListBySeller(sellerAddress).call();
      assert.equal(productList[0], productAddress);
    });
});