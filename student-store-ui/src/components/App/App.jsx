import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import * as Rrd from "react-router-dom";
import axios from "axios"
import NotFound from "../NotFound/NotFound"
import ProductDetail from "../ProductDetail/ProductDetail"


export default function App(){

// Declaring the state Variables and state functions

// State Variable for {products} of type [array]
const [products, setProducts] = React.useState([])

//State Variable for {isFetching} variable of type [boolean]
const [isFetching, setIsFetching] = React.useState(false)

//State Variable for {error} variable of type [String]
const[error, setError] = React.useState("404 Not Found My G")

//State Variable for {isOpen} variable of type [boolean]
const [isOpen, setIsOpen] = React.useState(false)

//State Variable for {shoppingCart} variabe of type [Aray of Obj or [{itemId : quantity}] ]
const [shoppingCart, setShoppingCart] = React.useState([{}])

//State Variable for the CheckoutForm
const[checkoutForm, setCheckoutForm] = React.useState()

//[handleAddItemToCart] function  Declaration
const handleAddItemToCart = () => {
  console.log("handleAddItemToCart was called")
}

// [handleRemoveItemFromCart] function Declaration
const handleRemoveItemFromCart = () =>{
  console.log("handleRemoveItemFromCart was called")
}

// State Variable {showDescription} of type [boolean] to toogle showing description
const [showDescription, setShowDescription] = React.useState(false)

 //State Variable for input field
 const[searchValue, setSearchValue] = React.useState("")

//Wrapper function for the (setShowDescription) function
const handlesetShowDescription = (bool) => {
  setShowDescription(bool)
}

//useEffect function
React.useEffect(() => {
  axios.get('https://codepath-store-api.herokuapp.com/store').then(response => {
    setProducts(response.data.products)
  }).catch(error => {
    setError('404 not accepted.')
    console.log(error)
  })
}, [])


//upadate products list function only
const handleSetProduct = async(word, caller) => {
  // get the original list
  let originalProducts = await axios.get('https://codepath-store-api.herokuapp.com/store').then(response => {
    return response.data.products}).catch( error => {
      console.log("An error occurred")
      return null
    })
  
  //declare the filtered product array
  let filteredProduct;
  
  //filter the products based on the request
  if(caller === 2 && word == "all"){
    filteredProduct = originalProducts
  }
  else if(caller === 1){
  //filter the original list based on search word
  filteredProduct = originalProducts.filter(product => product.name.toLowerCase().includes(word.toLowerCase()))
}
  else{
    //filter the original list based on category
    filteredProduct = originalProducts.filter(product => product.category == word)
  }

  //set the products
  setProducts(filteredProduct)
  }

//Function to track the {text} within the searchbar and change the product-grid display
const handleSearchTextChange = (event) => {

  //prevent default behaviour
  event.preventDefault()

  //get the {text} from the input field
  let text = event.target.value

  //set the value of the input field
  setSearchValue(text)

  //update the products grid view
  handleSetProduct(text, 1)
}

  return (
    <div className="app">
      <Sidebar />
      <Rrd.BrowserRouter>
        <main>
        <Navbar />
          <Rrd.Routes>
            <Rrd.Route path="/" element={<Home products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} showDescription={showDescription} handlesetShowDescription={handlesetShowDescription} handleSearchTextChange={handleSearchTextChange} searchValue={searchValue} handleSetProduct={handleSetProduct}/>}></Rrd.Route>
            <Rrd.Route path="/products/:productId" element={<ProductDetail handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} showDescription={showDescription} handlesetShowDescription ={handlesetShowDescription}/>}> </Rrd.Route>
            <Rrd.Route path="*" element={<NotFound />}></Rrd.Route> 
          </Rrd.Routes>

          {/* YOUR CODE HERE! */}
          
        </main>
      </Rrd.BrowserRouter>
    </div>
  )
}
