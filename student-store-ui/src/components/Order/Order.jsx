import * as React from "react"
import "./Order.css"
import 'axios'
import axios from "axios"

export default function Order(){
    const [orders, setOrders] = React.useState(null)

    React.useEffect(() => {
        axios.get('http://localhost:3001/orders/')
        .then((response) => {
            setOrders(response.data.purchases)
            console.log(orders)
        })
        .catch((error) => {
            console.log("something bad happened")
        })
    },[])
    return(
        <div className="order-page">
            {orders == null ? <></> 
            : <ul className="order-header">
                <li className="order-time">Time</li>
                <li className="order-customer">Customer</li>
                <li className="order-receipt">Receipt</li>
                <li className="order-id">Id</li>
                <li className="order-email">email</li>
            </ul>}
            {orders == null ? <h3>Could not contact the server</h3> :
            orders.length == 0 ? <h3> No previouse orders avaiable </h3> :
            orders.map((order,idx) => {
                return <ul key={idx} className={`order-row ${idx % 2 ? "even" : "odd"}`}>
                    <li className="order-time">{order.createdAt.split(" ")[0]} {order.createdAt.split(" ")[1].split("::")[0]}</li>
                    <li className="order-customer">{order.name}</li>
                    <li className="order-receipt">{order.receipt}</li>
                    <li className="order-id">{order.id}</li>
                    <li className="order-email">{order.email}</li>
                </ul>
            })
            }
        </div>
    )
}