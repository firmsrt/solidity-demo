import web3 from '../web3';
import ProductFactory from '../build/ProductFactory.json';

const instance = new web3.eth.Contract(
  ProductFactory.interface,
  '0xbF3542Fc6dB0064DC64f8F5E7d27d4EACA87Cd61'
);

export default instance;
