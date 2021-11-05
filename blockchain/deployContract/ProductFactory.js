import web3 from '../web3';
import ProductFactory from '../build/ProductFactory.json';

const instance = new web3.eth.Contract(
  ProductFactory.interface,
  '0x318A5f4656a38c1CDC8fdd8101B0E6361C17229b'
);

export default instance;
