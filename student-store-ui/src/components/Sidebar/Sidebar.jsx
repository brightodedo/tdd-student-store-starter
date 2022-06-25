import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"

export default function Sidebar(props) {
  const openOrNot = props.isOpen ? " open" : "closed"
  return (
    <section className={`sidebar ${openOrNot}`}>
      <div className="wrapper">
        {!props.isOpen ?  <button className="toggle-button button closed" onClick={props.handleOnToggle}><i className="material-icons md-48">arrow_forward</i></button> : <button className="toggle-button button open" onClick={props.handleOnToggle}><i className="material-icons md-48">arrow_forward</i></button>}
        <ShoppingCart shoppingCart={props.shoppingCart} isOpen={props.isOpen} products={props.products} checkoutForm={props.checkoutForm}
        handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm} successfulPost={props.successfulPost}
        incompleteCheckoutForm={props.incompleteCheckoutForm} isSubmitted={props.isSubmitted} removeReceipt={props.removeReceipt}/>
        
      </div>
    </section>
  )
}

<div className="checkout-success"><h3>Checkout Info <span className="icon button"><i className="material-icons md-48">fact_check</i></span></h3><div className="content"><p>A confirmation email will be sent to you so that you can confirm this order. Once you have confirmed the
order, it will be delivered to your dorm room.</p></div></div>