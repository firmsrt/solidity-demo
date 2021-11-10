import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ProductFactory from '../../blockchain/deployContract/ProductFactory';
import ProductInstance from '../../blockchain/deployContract/Product';
import ProductCard from '../../components/ProductCard';
import web3 from '../../blockchain/web3';
import Link from 'next/link';
import { Grid, Button } from '@mui/material';


class Marketplace extends Component {

    static async getInitialProps() {
        let productAddrList = await ProductFactory.methods.getDeployedProducts().call();
        let productList = [];
        for(let productAddr of productAddrList) {
            let prdtInstance = ProductInstance(productAddr);
            let detail = await prdtInstance.methods.getProductDetails().call();
            let product = {
                sellerAddr: detail[0],
                productName: detail[1],
                productDesc: detail[2],
                price: web3.utils.fromWei(detail[3], 'ether'),
                quantity: detail[4]
            }
            productList.push(product);
        }
        return { productList };
    }

    renderProductCard() {
        return this.props.productList.map(prdt => {
            return (
                <ProductCard product={prdt}></ProductCard>
            );
        });
    }

    render() {
        return (
            <Layout>
                <Link href="marketplace/myproduct">
                    <Button> My Product</Button>
                </Link>
                <Button>My Sale</Button>
                <Button>Order History</Button>
                <Grid container spacing={{ xs: 1 }}>
                    {this.renderProductCard()}
                </Grid>
            </Layout>
        );
    }
}
export default Marketplace;