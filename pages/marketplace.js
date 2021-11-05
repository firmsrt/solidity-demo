import React, { Component } from 'react';
import Layout from '../components/Layout';
import productFactory from '../blockchain/deployContract/ProductFactory';


class Marketplace extends Component {

    static async getInitialProps() {
        const productList = await productFactory.methods.getDeployedProducts().call();
        console.log("productList = " + productList);
        return { productList };
    }

    render() {
        return (
            <Layout>
                <h1>This is market place</h1>
            </Layout>
        );
    }
}
export default Marketplace;