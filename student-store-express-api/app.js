// YOUR CODE HERE

//All required statements here
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const data = require("./data/db.json")
const bodyParser = require('body-parser')
const Store = require("./models/store")
const router = require("./routes/router")

//all declarations in here
const app = express()

//all middleware statements declared here. 
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use("/store", router)

//health check api
app.get('/', (req, res) => {
    res.status(200).send({ "ping": "pong" })
})

//generic error handler
app.use( (err, req, res, next) =>{
    let status = err.status ? err.status : 500
    let message = err.message ? err.message : "Something wen't wrong in the application"
    return res.status(status).json({"error" :{status,message}})
})

module.exports = app