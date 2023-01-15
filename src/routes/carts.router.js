const { Router } = require("express");
const Product = require("../productManager");
const cartManager = require("../utils/cartsManager");


const router = Router();

//CREANDO CARRITO

router.post('/', async (req, res) => {
    const resp = await cartManager.addCart()
    res.json({ msg: "Cart created", id: resp })
})


router.get('/:id', async (req, res) => {
    console.log({ params: req.params.id, query: req.query.id })
    try {
        const cart = await cartManager.getCart(req.params.id);
        res.json({
            msg: 'OK',
            cart
        })
    } catch (error) {
        res.status(404).json({
            msg: "Cart not found"
        })
    }
})


//AFREGANDO EL PRODCUTO

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const product = await Product.getProductById(pid);
        const cart = await cartManager.addProductToCart(cid, product.id);
        res.json({
            msg: "ok",
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            msg: "Error adding product to cart",
            error: error.message
        })
    }
});




module.exports = router;