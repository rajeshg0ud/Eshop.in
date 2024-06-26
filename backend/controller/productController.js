import Product from '../models/productModel.js';
import asyncHandler from '../middleWare/asyncHandler.js';

const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource product not found');
    }
});

export { getAllProducts, getProductById };
