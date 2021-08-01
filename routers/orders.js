const router = require("express").Router();
const Order = require("../models/order")
const api = process.env.API_URL;

router.get(`/`, (req, res) => {
    const order = {
        name: "hair dresser",
        image: "some_url"
    }

})

router.post(`/`, (req, res) => {
    const { name, image, countInStock } = req.body
    const order = new Order({
        name,
        image,
        countInStock
    })
    order.save().then((createdorder => res.status(200).json(createdorder))).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })

})



module.exports = router;