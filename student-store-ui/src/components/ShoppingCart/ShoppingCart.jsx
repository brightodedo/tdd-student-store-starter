import * as React from "react"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import "./ShoppingCart.css"

export default function ShoppingCart(props){
    let subtotal = 0
    if(props.shoppingCart.length > 0){ 
    props.shoppingCart.map((item) => {
        subtotal += item.quantity * props.products[item.itemId-1].price
    })}
    return(
        <div className="shopping-cart">
          {props.isOpen ? <div className="open">
            <h3>Shopping Cart</h3> 
            {props.shoppingCart.length== 0 ? 
            <div className="notification">No items added to cart yet. Start shopping now!</div>
            : <div className="CartTable">
                <div className="header">
                    <div className="header-row">
                        <span className="flex-2">Name</span>
                        <span className="center">Quantity</span>
                        <span className="center">Unit Price</span>
                        <span className="center">Cost</span>
                      </div>
                      {props.shoppingCart.map((item, idx) => {
                        return (
                            <div className="product-row" key={idx}>
                                <span className="flex-2 cart-product-name">{props.products[item.itemId-1].name}</span>
                                <span className="center cart-product-quantity">{item.quantity}</span>
                                <span className="center cart-product-price">{`$${props.products[item.itemId-1].price}`}</span>
                                <span className="center cart-product-subtotal">{`$${(item.quantity * props.products[item.itemId-1].price).toFixed(2)}`}</span>
                            </div>
                        )
                      })}
                    </div>
                    <div className="receipt">
                      <div className="receipt-subtotal">
                        <span className="label">Subtotal</span>
                        <span></span>
                        <span></span>
                        <span className="center subtotal">{`$${subtotal.toFixed(2)}`}</span>
                      </div>
                      <div className="receipt-taxes">
                        <span className="label">Taxes and Fees</span>
                        <span></span>
                        <span></span>
                        <span className="center">{`$${(0.0875 * subtotal).toFixed(2)}`}</span>
                      </div>
                      <div className="receipt-total">
                        <span className="label">Total</span>
                        <span></span>
                        <span></span>
                        <span className="center total-price">{`$${(1.0875 * subtotal).toFixed(2)}`}</span>
                      </div>
                    </div>
                  </div>
            }
              <CheckoutForm isOpen={props.isOpen} shoppingCart={props.shoppingCart} checkoutForm={props.checkoutForm}
                handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}
                successfulPost={props.successfulPost} incompleteCheckoutForm={props.incompleteCheckoutForm} 
                isSubmitted={props.isSubmitted} products={props.products}/>
              
            </div> 
            : <></>}
          </div>
    )
}