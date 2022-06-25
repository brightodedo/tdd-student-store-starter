//make necessary variables
const express = require("express")
const router = express.Router()
const Store = require("../models/store")

//middleware declaration
router.use(express.json())
var bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/*+json' }))

router.get("/", (req, res) => {
    let result = Store.getProducts()

    return res.status(result.status).json(result.json)
})

router.post("/", (req,res) => {
    const {shoppingCart, user} = req.body

    let result = Store.purchase(shoppingCart, user)
    return res.status(result.status).json(result.json)
})

router.get("/:productId", (req, res) => {
    let result = Store.getProduct(req.params.productId)
    return res.status(result.status).json({product:result.json})
})

module.exports = router