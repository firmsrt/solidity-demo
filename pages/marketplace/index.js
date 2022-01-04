import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ProductFactory from '../../blockchain/deployContract/ProductFactory';
import ProductInstance from '../../blockchain/deployContract/Product';
import ProductCard from '../../components/ProductCard';
import web3 from '../../blockchain/web3';
import Link from 'next/link';
import { Grid, Button,Typography, Container } from '@mui/material';


class Marketplace extends Component {

    static async getInitialProps() {
        let productAddrList = await ProductFactory.methods.getDeployedProducts().call();
        let productList = [];
        for(let productAddr of productAddrList) {
            let prdtInstance = ProductInstance(productAddr);
            let detail = await prdtInstance.methods.getProductDetails().call();
            let product = {
                productAddr: productAddr,
                sellerAddr: detail[0],
                productName: detail[1],
                productDesc: detail[2],
                price: web3.utils.fromWei(detail[3], 'ether'),
                quantity: detail[4]
            }
            productList.push(product);
        }
        let productSize = productList.length;
        return { productList, productSize };
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
                <Container maxWidth="false" style={{marginTop: 40}} disableGutters={true}>
                    <Grid container>
                        <Grid item md={4} xs={12} style={{display: "flex"}}>
                            <Typography variant="h2">
                                Marketplace
                            </Typography>
                            <Typography variant="subtitle1" alignSelf="center" style={{marginLeft: 10}}>
                                All Product ({this.props.productSize})
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={12} textAlign="right" alignSelf="center">
                            <Button>Order History</Button>
                            <Button>My Sales</Button>
                            <Link href="/marketplace/myproduct">
                                <Button>My Product</Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={{ xs: "30px" }} style={{marginTop: "10px"}}>
                        {this.renderProductCard()}
                    </Grid>
                </Container>
            </Layout>
        );
    }
}
export default Marketplace;