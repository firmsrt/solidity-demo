import { Component } from 'react';
import { Card,CardActions,CardContent,CardMedia,Avatar,Typography,Grid } from '@mui/material';

class ProductCard extends Component {
    render() {
        return (
            <Grid item xs={6} md={3} xl={2} key={this.props.productAddr}>
                <Card>
                    <CardMedia
                        component="img"
                        image="/IMG_3390.JPG"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography variant="body1" style={{ wordWrap: "break-word" }}>
                        {this.props.product.productName}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Avatar src={"/ethIcon.png"} sx={{ width: "18px", height: "18px", marginRight:"8px" }}/>
                        <Typography variant="body2" color="text.secondary" display="flex">
                            {this.props.product.price}
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default ProductCard