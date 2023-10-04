import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const SingleProduct = ({ product }) => {
    const [productId, setProductId] = useState(product.id);
    // const [isPurchased, setIsPurchased] = useState(false);
    const purchaseProducts = () => {
        const options = {
            method: "post",
            url: "http://localhost:3000/purchase",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                productId
            }
        };

        axios(options)
            .then((response) => {
                if (response.data.message === 'Purchase successful!') {
                    console.log(response.data.message)
                    toast.success('Product purchased successfully');
                }
            })
            .catch((error) => {
                toast.error('Error occurred while purchasing the product');
                if (error?.response?.status === 401) {

                }
            });
    }
    return (
        <Grid item key={product.id} xs={6} sm={6} md={4} lg={2} style={{ padding: "30px 0px 0px 30px" }}>
            <ToastContainer />
            <Card style={{ height: "300px", width: "150px" }}>
                <CardMedia
                    component="img"
                    alt={product.name}
                    height="100"
                    image={product.image}
                />
                <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {product.rating}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        Price: ${product.price.toFixed(2)}
                    </Typography>
                </CardContent>
                <Button variant='contained' onClick={purchaseProducts}>purchase</Button>
            </Card>
        </Grid>)
}

export default SingleProduct