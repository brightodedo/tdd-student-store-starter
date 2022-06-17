import * as React from "react"
import "./Home.css"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import { useEffect } from "react"
import imgSrc from "../../assests/codepath.svg"
import Search from "../Search/Search"

export default function Home(props) {
  {useEffect(() => {
    props.handlesetShowDescription(false)
}, [])}
  return (
    <div className="home">
      <Hero />

      {/* Search bar!!!!*/}
      <Search  handleSearchTextChange={props.handleSearchTextChange} searchValue={props.searchValue} handleSetProduct={props.handleSetProduct}/>

      <ProductGrid {...props}/>


      <h1>About Us</h1>
      <div className="About">
        <div className="About-text">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti accusantium odio dolores atque minus ullam? Commodi, magnam. Voluptates eaque sapiente porro rerum quod dolores magnam libero quos non magni aliquam eos mollitia, atque quae ducimus, suscipit ullam facere eius nemo incidunt ipsum officiis culpa fugiat aliquid. Odio saepe quam dignissimos, quisquam beatae harum rerum, numquam eveniet consequuntur laborum nesciunt ipsa dolorem necessitatibus. Qui, ipsa ea corporis aspernatur odio vitae dolore ullam, ab necessitatibus maiores magni est voluptatibus. Modi autem asperiores nihil nobis illo beatae facilis et cupiditate minus! Veniam ducimus explicabo labore animi optio quidem, aliquid quasi odio non doloribus cum quisquam? Corporis dolorem repellat sed excepturi fugiat, vitae beatae? Illo nihil quae ad animi iusto pariatur, facilis cupiditate eveniet! Corporis iste eos dicta necessitatibus optio totam doloribus odit molestias veritatis eaque impedit, aliquam laboriosam consequuntur, itaque quia numquam quos ducimus facilis commodi repellat earum. Doloribus laboriosam sit assumenda ex.
        </p>
        </div>
        <div className="About-img">
        <img src={imgSrc} alt="" />
        </div>        
      </div>

      <div className="contact">
        <h1>Contact Us</h1>

      </div>

      <footer className="footer">
        <div className="content">
          <div className="link-column">
            <h4>Categories</h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="link-column">
          <h4> Company </h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="link-column">
          <h4> Support </h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="link-column">
          <h4> Account </h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="link-column">
          <h4> Socials </h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="link-column">
          <h4> Our App </h4>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
