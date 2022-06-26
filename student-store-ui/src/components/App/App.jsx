import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import * as Rrd from "react-router-dom";
import axios from "axios"
import NotFound from "../NotFound/NotFound"
import ProductDetail from "../ProductDetail/ProductDetail"
import Order from "../Order/Order"


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

//State Variable for {shoppingCart} variabe of type [array of Obj or [{itemId:1, quantity : 2}] ]
const [shoppingCart, setShoppingCart] = React.useState([]) //[{itemId:1, quantity : 2}]

//State Variable for the CheckoutForm
const[checkoutForm, setCheckoutForm] = React.useState({name: "name", email : "kaguya@loveiswar.com"})

const [successfulPost, setSuccessfullPost] = React.useState(null)

const [incompleteCheckoutForm, setIncompleteCheckoutForm] = React.useState("")

const [isSubmitted, setIsSubmitted] = React.useState(null)

//[handleAddItemToCart] function  Declaration
const handleAddItemToCart = (productId) => {

  //Check if item already in shopping cart
  let itemIdx = -1
  for(let i = 0; i < shoppingCart.length; i++){
    if(shoppingCart[i].itemId == productId) itemIdx = i
  }
  //if it exists increase the amount in the shopping cart
  if(itemIdx != -1) {
    let falseShoppingCart = [...shoppingCart]
    falseShoppingCart[itemIdx] = {"itemId" : productId, "quantity" : falseShoppingCart[itemIdx].quantity + 1}
    setShoppingCart(falseShoppingCart)
  }
  else{
    setShoppingCart([...shoppingCart, {"itemId" : productId, "quantity" : 1}])
  }
}

// [handleRemoveItemFromCart] function Declaration
const handleRemoveItemFromCart = (productId) =>{

  //Check if item exists in shopping cart
  let itemIdx = -1
  for(let i = 0; i < shoppingCart.length; i++){
    if(shoppingCart[i].itemId == productId) itemIdx = i
  }

  //if it exists increase the amount in the shopping cart
  if(itemIdx != -1) {
    /*check if quantity is 1 
    if quantity is 1 then remove object from cart 
    */
   if(shoppingCart[itemIdx].quantity == 1){
    let falseShoppingCart = shoppingCart.filter((items) => {
      if(items.itemId != productId) return items
    })
    setShoppingCart(falseShoppingCart)
   }
   else{
    let falseShoppingCart = [...shoppingCart]
    falseShoppingCart[itemIdx].quantity = falseShoppingCart[itemIdx].quantity-1
    setShoppingCart(falseShoppingCart)
   }
  }
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
  axios.get('http://localhost:3001/store').then(response => {
    setProducts(response.data.products)
  }).catch(error => {
    setError('404 not accepted.')
    console.log(error)
  })
}, [])


//upadate products list function only
const handleSetProduct = async(word, caller) => {
  // get the original list
  let originalProducts = await axios.get('http://localhost:3001/store').then(response => {
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

const handleOnToggle = () => {
  setIsOpen(!isOpen)
} 

const handleOnCheckoutFormChange = (name, value) => {
  if(name == "email")setCheckoutForm({...checkoutForm, email: value})
  else setCheckoutForm({...checkoutForm, name :  value})

}

const handleOnSubmitCheckoutForm = () => {
  if(shoppingCart.length < 1) {
    setIncompleteCheckoutForm("shopping cart is empty")
  }else if(!(checkoutForm.name && checkoutForm.email)){
    setIncompleteCheckoutForm("Check out form must contain name and email")
  }
  else{
    axios.post('http://localhost:3001/store', {
      "user" : checkoutForm,
      "shoppingCart" : shoppingCart
    })
    .then((response) => {
      setIsSubmitted(response.data.purchase)
      setSuccessfullPost(true)
      setShoppingCart([])
      setCheckoutForm({name: "name", email : "kaguya@loveiswar.com"})
      setIncompleteCheckoutForm("")
    })
    .catch((error) => {
      console.log(error)
      setSuccessfullPost(false)
      setIncompleteCheckoutForm("")
    })
  }
}

const removeReceipt = () => {
  setIsSubmitted(null)
  setSuccessfullPost(null)
}
  return (
    <div className="app">
      
      <Rrd.BrowserRouter>
        <main>
        <Sidebar isOpen={isOpen} handleOnToggle={handleOnToggle} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} 
        handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} successfulPost={successfulPost}
        incompleteCheckoutForm={incompleteCheckoutForm} isSubmitted={isSubmitted} removeReceipt={removeReceipt}/>
        <Navbar />
          <Rrd.Routes>
            <Rrd.Route path="/" element={<Home products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} showDescription={showDescription} handlesetShowDescription={handlesetShowDescription} handleSearchTextChange={handleSearchTextChange} searchValue={searchValue} handleSetProduct={handleSetProduct} 
            shoppingCart={shoppingCart}/>}></Rrd.Route>
            <Rrd.Route path="/products/:productId" element={<ProductDetail handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} showDescription={showDescription} handlesetShowDescription ={handlesetShowDescription} shoppingCart={shoppingCart} isFetching={isFetching} setIsFetching={setIsFetching}/>}> </Rrd.Route>
            <Rrd.Route path="/orders" element={<Order/>}></Rrd.Route>
            <Rrd.Route path="*" element={<NotFound />}></Rrd.Route> 
          </Rrd.Routes>

          {/* YOUR CODE HERE! */}
          
        </main>
      </Rrd.BrowserRouter>
    </div>
  )
}
