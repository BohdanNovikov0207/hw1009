const express = require('express')

const HOST = 'localhost'
const PORT = 8000

const app = express()

let products = [
    {
        id: 0,
        name: 'laptop',
        price: '800',
        category: 'electronics'
    },
    {
        id: 1,
        name: 'mouse',
        price: '25',
        category: 'electronics'
    },
    {
        id: 2,
        name: 'phone',
        price: '450',
        category: 'electronics'
    },
    {
        id: 3,
        name: 'headphones',
        price: '100',
        category: 'electronics'
    }
]

app.get('/', (req, res) => {
    res.status(200).json("Hello World")
})

app.get('/products', (req, res) => {
    const {take} = req.query
    const {category} = req.query

    let selectedProducts = [...products]

    if (category){
        selectedProducts = selectedProducts.filter((product) => {
            return product.category === category
        })
    }
    if (!take){
        return res.status(200).json(selectedProducts);
    }
    const takeNumber = parseInt(take)
    if (!Number.isInteger(takeNumber) || takeNumber <= 0){
        res.status(400).json(
            {
                message: 'take must be a positive integer'
            }
        )
        return
    }
    selectedProducts = selectedProducts.slice(0, takeNumber)
    return res.status(200).json(selectedProducts)
})

app.get('/products/:id', (req, res) => {
    const {id} = req.params
    const productId = parseInt(id)

    if (!Number.isInteger(productId) || productId < 0){
        res.status(400).json({
            message: 'product must be a positive integer'
        })
        return
    }
    
    const product = products.find((product) => {
        return product.id == productId
    })

    if (!product){
        res.status(404).json({
            message: 'product not found'
        })
        return
    }

    res.status(200).json(product)
})

app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`)
})