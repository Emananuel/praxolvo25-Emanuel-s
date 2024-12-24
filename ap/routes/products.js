const express = require('express');
const router = express.Router();
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// GET /products/:id - Get a product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json(product);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Este campo es obligatorio y debe ser un texto.' });
    }

    if (!descr || typeof descr !== 'string' || descr.trim().length === 0) {
        return res.status(400).json({ error: 'Debes ingresar una descripcion.' });
    }

    if (!price || isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Este campo es obligatorio y debe ser mayor a 0.' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        descr,
        price: parseFloat(price),
        creationDate: new Date()
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});



/**
 * Were missing some routes here...
 */

module.exports = router;