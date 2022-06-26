//make necessary variables
const express = require('express')
const Store = require('../models/store')
const router = express.Router()

//middleware declaration
router.use(express.json())


router.get("/", (req, res) => {
    let result = Store.getPurchases()

    return res.status(result.status).send(result.json)
} )

router.get("/:orderId", (req, res) => {
    let orderId = req.params.orderId
    let result = Store.getPurchase(orderId)

    return res.status(result.status).send(result.json)
})
module.exports = router