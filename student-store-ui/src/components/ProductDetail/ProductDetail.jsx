import * as React from "react"
import './ProductDetail.css'
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductView from "../ProductView/ProductView"
import NotFound from "../NotFound/NotFound"


export default function ProductDetail(props){
    //State Variable for {product} of type [Obj {}]
    const [product, setProduct] = React.useState(null)

    //extract the {productId} of type [ int ] from the url using (useParams)
    const {productId} = useParams()

    //Get request with axios to the (`/store/:productId`) API with the use of the useEffect function
    React.useEffect(() => {
        props.setIsFetching(true)
        axios.get(`http://localhost:3001/store/${productId}`).then(response => {
            setProduct(response.data.product)
        }).catch(error => {
            console.log("Your call failed")
            setProduct(null)
        }).then(() => {
            props.setIsFetching(false)
        }

        )
    }, [])

    return(
        <div className="product-detail">
            {props.isFetching ? <h1 className="loading"> Loading </h1> :
            !props.isFetching && product == null ? <NotFound/> :
            <ProductView product={product} productId={productId} showDescription={props.showDescription} handlesetShowDescription={props.handlesetShowDescription} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart} 
            shoppingCart={props.shoppingCart}/>
            }
        </div>
    )
}