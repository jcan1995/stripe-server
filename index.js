const keys = require('./keys');
const STRIPE_KEY = keys.STRIPE_KEY_DEV;
const express = require('express');
const app = express();
const stripe = require('stripe')(STRIPE_KEY);

app.use(express.json());
app.set('json spaces', 40);

function cleanProductsOptions(options) {
    let cleanOptions = {};
    Object.keys(options).forEach((o) => {
        if(options[o] !== null && options[o] !== undefined) {
            cleanOptions[o] = options[o];
        }
    });
    
    return cleanOptions;
}

// https://stripe.com/docs/api/products/list?lang=node
app.get('/v1/products', async (req, res) =>  {
    const options = req.body;
    const cleanOptions = cleanProductsOptions(options);
    const products = await stripe.products.list({...cleanOptions});
    
    res.json(products).status(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => `listening on port ${PORT}`);
