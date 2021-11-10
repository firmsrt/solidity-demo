import { Component } from 'react';
import { Card,CardActions,CardContent,CardMedia,Button,Typography,Grid } from '@mui/material';

class ProductCard extends Component {

    render() {
        return (
            <Grid item xs={6} sm={4} md={2} xl={2}>
                <Card>
                    <CardMedia
                        component="img"
                        height="100"
                        width="50"
                        image="/IMG_3390.JPG"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography variant="body1" component="div">
                        {this.props.product.productName}
                        </Typography>
                        <Typography noWrap variant="subtitle2" color="text.secondary">
                        {this.props.product.productDesc}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                        {this.props.product.price}
                        </Typography>
                        <Button size="small" color='primary'>Buy</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default ProductCard