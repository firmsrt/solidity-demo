import { Component } from "react";
import Link from "next/link";
import Layout from '../../../components/Layout';
import productFactory from '../../../blockchain/deployContract/ProductFactory';
import { Button } from '@mui/material';

class MyProduct extends Component {
    render() {
        return (
            <Layout>
                <Link href="/marketplace/myproduct/create">
                    <Button>Create Product</Button>
                </Link>
            </Layout>
        );
    }
}

export default MyProduct;