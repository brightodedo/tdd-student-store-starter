import * as React from "react"
import "./Navbar.css"
import * as Rrd from "react-router-dom"
import imgSrc from "../../assests/codepath.svg"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Rrd.Link to='/'><img src={imgSrc} alt="" /></Rrd.Link>
      <Rrd.Link to='/'> Home </Rrd.Link> 
      <Rrd.Link to='/'> About Us </Rrd.Link>
      <Rrd.Link to='/'> Contact Us </Rrd.Link>
      <Rrd.Link to='/'> Buy Now </Rrd.Link>
    </nav>
  )
}
