import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import "./CheckoutForm.css"

export default function CheckoutForm(props){
    return(
        <div className="checkout-form">
                <h3 className="">Payment Info</h3>
                <div className="input-field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input name="email" className="checkout-form-input" type="email" placeholder="student@codepath.org" value={props.checkoutForm.email}
                    onChange={(event) => {
                        props.handleOnCheckoutFormChange(event.target.name, event.target.value)
                    }}/>
                  </div>
                </div>
                <div className="input-field">
                  <label className="label">Name</label>
                  <div className="control ">
                    <input name="name" className="checkout-form-input" type="text" placeholder="Student Name" value={props.checkoutForm.name}
                    onChange={(event) => {
                        props.handleOnCheckoutFormChange(event.target.name, event.target.value)
                        }}/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input name="termsAndConditions" type="checkbox" />
                      <span className="label">I agree to the <a href="#terms-and-conditions">terms and conditions</a></span>
                    </label>
                  </div>
                </div>
                {props.incompleteCheckoutForm == "" ? <></> : <p className="error">{props.incompleteCheckoutForm}</p>}
                <div className="field">
                  <div className="control">
                    <button className="button checkout-button" onClick={() => {props.handleOnSubmitCheckoutForm()}}>Checkout</button>
                  </div>
                </div>

                {
                    props.successfulPost == null ? <></> : 
                    props.successfulPost == true ? <div className="checkout-success"><p className="success">"Success!"</p></div> :
                    <div className="checkout-success"><p className="error">Something went wrong: Your order was not submitted! </p></div>
                }
                
                <h3>Checkout Info <span className="icon button"><i className="material-icons md-48">fact_check</i></span></h3>
                
                { props.isSubmitted == null ? <div className="content"><p>A confirmation email will be sent to you so that you can confirm this order. Once you have confirmed the order, it will be delivered to your dorm room.</p>
                </div> 
                : <div className="REce">
                  <h1>Receipt</h1>
                  
                  {props.isSubmitted == null ? <></> : <p>Showing Receipt for {props.isSubmitted.name} available at {props.isSubmitted.email}</p>}
                  <ul>
                    {props.isSubmitted.order.map((item,idx) => {
                      return <li key={idx}>{`${item.quantity} total ${props.products[item.itemId-1].name}
                      purchased at a cost of $${props.products[item.itemId-1].price} for a total
                      cost of $${(item.quantity * props.products[item.itemId-1].price).toFixed(2)}`}</li>
                    })}
                  </ul>
                  </div>}
                
        </div>
    )
}