import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard.jsx"

export function ProductGrid(props){
    
    //{useEffect} function to change the {showDescription} state variable to (boolean) value of [false]
    React.useEffect(() => props.handlesetShowDescription(false), [])
    //Return Statement
    return(
        <div className="product-grid">
            {props.products.length > 0 ? props.products.map((product, idx) => {
                return (<ProductCard product={product} key={idx} showDescription={props.showDescription} handlesetShowDescription={props.handlesetShowDescription} handleAddItemToCart={props.handleAddItemToCart}  handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>)
            }) : 
            <h1> Don't give up! Find something GOOD for your Daddy! 😏</h1>
        }
        </div>
    )
}

export default ProductGrid