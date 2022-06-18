import * as React from "react"
import "./ProductView.css"
import ProductCard from "../ProductCard/ProductCard"

export function ProductView(props){
    //{useEffect} function to change the {showDescription} state variable to (boolean) value of [true]
    React.useEffect(() => {
        props.handlesetShowDescription(true)
    }, [])

    return(
    <div className="product-view">
        <h1 className="product-id">Product #{props.productId}</h1>
        <div className="product-view-card">
            <ProductCard product={props.product} showDescription={props.showDescription} handlesetShowDescription={props.handlesetShowDescription} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart} shoppingCart={props.shoppingCart}/>
        </div>
    </div>)
}

export default ProductView