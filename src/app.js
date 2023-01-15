const express = require('express');
const cartsRouter = require('./routes/carts.router.js');
const productRouter = require('./routes/products.router.js');

const server = express();
server.use(express.urlencoded({ extended: true }))


server.use('/api/products', productRouter)
server.use('/api/carts', cartsRouter)

server.listen(8080, () => {
    console.log('Escuchando en puerto 8080')
})
