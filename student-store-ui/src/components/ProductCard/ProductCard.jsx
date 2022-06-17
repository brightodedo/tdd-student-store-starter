import * as React from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard(props) {
    let display = props.showDescription ? "display" : ""
    return(
        <div className={`product-card ${display}`}>
             <div className="media">
                <Link to={`/products/${props.product.id}`}><img src={props.product.image} alt={`Image of an ${props.product.name}`} /></Link> 
            </div>
            <p className="product-name">{props.product.name}</p>
            <p className="product-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.product.price)}</p>
            {props.showDescription ? <p className="product-description"> {props.product.description} </p> : <></>}
            <div>
                <button className="add" onClick={() => {props.handleAddItemToCart(props.product.id)}}> + </button>
                <button className="remove" onClick={() => {props.handleRemoveItemFromCart(props.product.id)}}> - </button>
            </div>
            <p className="product-quantity"> Amount Placeholder </p>
        </div>
    )
}