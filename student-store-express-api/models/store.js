const { path } = require("../app")

let Store = class{

    constructor(){
    }

    static purchase(shoppingCart, user){
        //check if shoppingCart is null
        if(shoppingCart == null) return {status: 400, json : {error : "bad Request: shoppingCart property is missing"}}

        //check if user is null
        if (user == null) return {status : 400, json : {error : "bad Request: user property is missing"}}

        //check each shoppingCart object has correct keys
        let incorrectKeys = false
        for(let i = 0; i < shoppingCart.length ; i++){
            if( shoppingCart[i].itemId == null || shoppingCart[i].quantity == null ) {
                incorrectKeys = true
                break
            }
        }

        //if we should return an error 
        if(incorrectKeys) return {status : 400, json : {error : "bad Request: shoppingCart is missing property itemId or quantity"}}
        
        //check if duplicate item exists in the array
        let ifduplicates = false
        for(let i = 0; i < shoppingCart.length; i++){
            for(let j = i+1 ; j < shoppingCart.length; j++){
                if(shoppingCart[i].itemId === shoppingCart[j].itemId) ifduplicates = true
            }
        }

        if(ifduplicates) return {status : 400, json : {error : "bad Request: shoppingCart contains a duplicate item"}}

        const data = require("../data/db.json")
        const products = data.products
        //calculate the total cost of items
        let total = 0
        //loop through the array
        for(let i = 0; i < shoppingCart.length; i++){
                //fetch the cost of the item and multiply by quantity.... store it in the total array.
                total += products[shoppingCart[i].itemId-1].price * shoppingCart[i].quantity
        }
        total *= 1.0875

        //create a new purchase object
        let currentDate = new Date()

        //create receipt
        let receipt = shoppingCart.map((item) => {
            return `Bought ${item.quantity} ${products[item.itemId-1].name} at $${(item.quantity * products[item.itemId-1].price).toFixed(2)} \t`
        })

        receipt.push(`Total $${total.toFixed(2)}`)

        const purchaseObj = {
            "id" : data.purchases.length+1,
            "name" : user.name,
            "email" : user.email,
            "order" : shoppingCart,
            "total" : total,
            "createdAt" : `${currentDate.getMonth()+1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}::${currentDate.getMilliseconds()}`,
            "receipt" : receipt
        }

        //add the purchase to the data file
        data.purchases.push(purchaseObj)

        const path = require('node:path')

        //update the data file 
        const fs = require('fs')
        let stringData = JSON.stringify(data, null, 2)
        fs.writeFileSync(path.resolve(__dirname, "../data/db.json"), stringData);

        return {status : 201, json : {"purchase" : purchaseObj}}
    }

    static getProducts(){
        const data = require("../data/db.json")

        return {status: 200, json : {products : data.products}}
    }

    static getProduct(productId){
        const data = require("../data/db.json")
        if (productId > data.products.length) return {status: 404, json : {error : "said page does not exist"}}
        else return {status : 200, json : data.products[productId-1]}
    }

    static getPurchases(){
        const data = require("../data/db.json")

        return {status : 200, json: {purchases : data.purchases}}
    }

    static getPurchase(orderId){
        const data = require("../data/db.json")
        let result = data.purchases

        if(orderId > result.length) return {status : 400, json : {error : "orderId does not exist"}}
        else{
            return {status : 200, json : {order : result[orderId-1]}}
        } 
    }
}


module.exports = Store