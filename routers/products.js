const router = require("express").Router();
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const api = process.env.API_URL;


router.get(`/`, async(req, res) => {
    // query parameters
    // localhost:3000/api/v1/products?categories=234324

    let filter = {}

    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") }
    }

    const productList = await Product.find(filter).populate("categories")
    if (!productList) return res.status(500).send("No product found")
    res.send(productList)
})

router.post(`/`, async(req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    const { name, description, richDescription, image, brand, price, countInStock, rating, numReviews, isFeatured } = req.body

    const product = new Product({
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    })
    await product.save();

    if (!product) return res.status(500).send("The Product cannot be created")

    res.send(product);

})

router.put("/:id", async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid Product Id")
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    const { name, description, richDescription, image, brand, price, countInStock, rating, numReviews, isFeatured } = req.body

    const product = await Product.findByIdAndUpdate(
        req.params.id, {
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        }, { new: true }
    )

    if (!product) return res.status(404).send("The Product Cannot be Created");

    res.send(product);
})

router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "The Product is deleted."
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }
        })).catch((err) => {
            return res.status(400).json({
                success: false,
                error: err
            })
        })
})

router.get("/get/count", async(req, res) => {
    productCount = await Product.countDocuments((count) => count)

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({ productCount: productCount });
})


router.get("/get/featured/:count", async(req, res) => {
    const count = req.params.count ? req.params.count : 0;

    const products = await Product.find({ isFeatured: true }).limit(+count)

    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products);
})


module.exports = router;