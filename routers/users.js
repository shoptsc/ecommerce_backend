const router = require("express").Router();
const Product = require("../models/product")
const api = process.env.API_URL;

router.get(`/`, (req, res) => {
    const product = {
        name: "hair dresser",
        image: "some_url"
    }

})

router.post(`/`, (req, res) => {
    const { name, image, countInStock } = req.body
    const product = new Product({
        name,
        image,
        countInStock
    })
    product.save().then((createdProduct => res.status(200).json(createdProduct))).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })

})



module.exports = router;