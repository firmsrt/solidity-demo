import { Component } from "react";
import Layout from "../../../components/Layout";
import ProductFactory from '../../../blockchain/deployContract/ProductFactory';
import web3 from "../../../blockchain/web3";
import Router from 'next/router';
import { Grid,CardMedia,TextField,Typography,Container } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

class CreateProduct extends Component {

    state = {
        productName: '',
        productDesc: '',
        price: '',
        quantity: '',
        loading: false,
        errorMessage: ''
    }

    createProduct = async () => {
        this.setState({ loading: true, errorMessage: ''});
        const { productName, productDesc, price, quantity } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await ProductFactory.methods
                .createProduct(productName, productDesc, web3.utils.toWei(price, 'ether'), quantity)
                .send({ from: accounts[0] });
            Router.push("/marketplace/myproduct");
        } catch (err) {
            console.log(err.message);
            this.setState({ errorMessage: err.message });
        }
        
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <Container maxWidth="false" style={{marginTop: 40}} disableGutters={true}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} style={{display: "flex"}}>
                            <Typography variant="h2">
                                Add Product
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={{ xs: "30px" }} style={{marginTop: "10px"}}>
                        <Grid item xs={3}>
                            <CardMedia
                                component="img"
                                height="194"
                                image="/IMG_3390.JPG"
                                alt="Paella dish"
                            />
                        </Grid>
                        <Grid item container xs={5}>
                            <Grid item>
                                <TextField id="outlined-basic" label="Product Name" variant="outlined" fullWidth size="small" margin="dense" 
                                    value={this.state.productName} onChange={event => this.setState({ productName: event.target.value })}/>
                                <TextField id="outlined-basic" label="Product Description" variant="outlined" multiline rows={5} fullWidth size="small" margin="dense"
                                    value={this.state.productDesc} onChange={event => this.setState({ productDesc: event.target.value })}/>
                                <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth size="small" margin="dense"
                                    value={this.state.price} onChange={event => this.setState({ price: event.target.value })}/>
                                <TextField id="outlined-basic" label="Quantity" variant="outlined" fullWidth size="small" margin="dense"
                                    value={this.state.quantity} onChange={event => this.setState({ quantity: event.target.value })}/>
                                <LoadingButton variant="contained" loadingPosition="start" startIcon={<AddOutlinedIcon/>} loading={this.state.loading} onClick={this.createProduct}>Create</LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        );
    }
}
export default CreateProduct;