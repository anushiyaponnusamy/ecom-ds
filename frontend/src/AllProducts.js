import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from 'axios'
import SingleProduct from './SingleProducts';
const ProductCard = (props) => {

    const { productsArray } = props;
    const [products, setProducts] = useState([]);

    const getAllProducts = () => {
        const options = {
            method: "get",
            url: "http://localhost:3000/getproducts"

        };

        axios(options)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    console.log(error)
                }
            });
    }

    useEffect(() => {
        // Check if productsArray is available and not empty, set the state accordingly
        if (productsArray && productsArray.length > 0) {
            setProducts(productsArray);
        } else {
            // If productsArray is empty, fetch products from the server
            getAllProducts();
        }
        console.log("productsArray", productsArray)
    }, [productsArray]);
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <SingleProduct product={product} key={product.id} />
            ))}
        </Grid>
    );
};

export default ProductCard;
