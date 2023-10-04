
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.get('/getproducts', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const products = JSON.parse(data);
        res.json(products);
    });
});

app.get('/search-products/:search', (req, res) => {
    const { search } = req.params;
    console.log("search", search)
    // Read products from the products.json file
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let products = JSON.parse(data);

        // If search query is provided, filter products by name
        if (search) {
            products = products.filter(product =>
                product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
        }

        res.json(products);
    });
});


app.post('/purchase', (req, res) => {
    console.log("req.body", req.body)
    const { productId } = req.body;
    // fs.readFile('purchases.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading purchases file:', err);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //         return;
    //     }

    let purchases = [];
    //     if (data.length > 0) {
    //         try {
    //             purchases = JSON.parse(data);
    //         } catch (error) {
    //             console.error('Error parsing purchases data:', error);
    //             res.status(500).json({ error: 'Internal Server Error' });
    //             return;
    //         }

    //         const existingPurchase = purchases.find(purchase => purchase.productId === productId);
    //         if (existingPurchase) {
    //             return res.json({ message: 'Product already purchased.' });
    //         }

    //     } else {
    //         console.log()
    purchases.push({ productId, timestamp: new Date() });

    fs.writeFile('purchases.json', JSON.stringify(purchases), (err) => {
        if (err) {
            console.error('Error writing purchases file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Purchase successful!' });
    });
    // }
    // });
});

app.get('/check-purchase/:productId', (req, res) => {
    const { productId } = req.params;
    // Read the purchases.json file
    fs.readFile('purchases.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading purchases file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        let purchases = [];
        if (data.length > 0) {
            try {
                purchases = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing purchases JSON:', parseError);
                res.status(500).json({ error: 'Error parsing JSON data' });
                return;
            }
            if (!Array.isArray(purchases)) {
                console.error('Invalid purchases data:', purchases);
                res.status(500).json({ error: 'Invalid purchases data' });
                return;
            }
            let isProductPurchased = false;
            // const isProductPurchased = purchases.some(purchase => purchase.productId === parseInt(productId));
            for (let i = 0; i < purchases.length; i++) {
                if (purchases[i].productId === parseInt(productId)) {
                    isProductPurchased = true
                }
            }
            if (isProductPurchased) {
                res.json({ message: 'Product already purchased.' });
            } else {
                res.json({ message: 'Product not purchased yet.' });
            }
        }
        else {

            res.json({ message: 'Product not purchased yet.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
