const Product = require('../models/productModel')

const router = require('express').Router()

router.get('/',  (async (req, res) => {
    
    try{
    const products = await Product.find()

        res.send(products)
    } catch (err) {
        res.send(err)
    }
}))

router.get('/:id', async (req, res) => {

    try{
        const product = await Product.findById(req.params.id)

        if(product) {
            res.json(product)
        } else {
            throw new Error('Product Not found')
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/', async (req, res) => {
    const {productName, price, quantity, image } = req.body

    const product = new Product({
        productName,
        price,
        quantity,
        image
    })

    try{
        const savedProduct = await product.save()
        
        res.send(savedProduct)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
    
        if(product) {

            const { productName, quantity, price, image } = req.body;

            product.productName = productName;
            product.quantity = quantity;
            product.price = price;
            product.image = image

            const savedProduct = await product.save()
            
            res.send(savedProduct)
        } else {
            res.send(['Product not found'])
        }
    } catch(err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
    
        if(product) {
            await product.deleteOne()
            res.send('Product removed')
        } else {
            res.send('Product not found')
        }        
    } catch(err) {
        res.send(err)
    }
})

module.exports = router