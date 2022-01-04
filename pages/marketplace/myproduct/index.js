import { Component } from "react";
import Link from "next/link";
import Layout from '../../../components/Layout';
import productFactory from '../../../blockchain/deployContract/ProductFactory';
import { Button, Container, Grid, Typography } from '@mui/material';

class MyProduct extends Component {
    render() {
        return (
            <Layout>
                <Container maxWidth="false" style={{marginTop: 38}} disableGutters={true}>
                    <Grid container alignItems="center">
                        <Grid item md={4} xs={12} style={{display: "flex"}}>
                            <Typography variant="h2">
                                My Product
                            </Typography>
                            <Typography variant="subtitle1" alignSelf="center" style={{marginLeft: 10}}>
                                All Product ({this.props.productSize})
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={12} textAlign="right" alignSelf="center">
                            <Link href="/marketplace/myproduct/create">
                                <Button variant="gradient">Create Product</Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={{ xs: "30px" }} style={{marginTop: "10px"}}>
                        
                    </Grid>
                </Container>
            </Layout>
        );
    }
}

export default MyProduct;