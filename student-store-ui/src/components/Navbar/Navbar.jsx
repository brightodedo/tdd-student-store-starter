import * as React from "react"
import "./Navbar.css"
import * as Rrd from "react-router-dom"
import imgSrc from "../../assests/codepath.svg"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <Rrd.Link to='/'> Home </Rrd.Link> 
      <Rrd.Link to='/'> About Us </Rrd.Link>
      <Rrd.Link to='/'> Contact Us </Rrd.Link>
      <Rrd.Link to='/'> Buy Now </Rrd.Link>
    </nav>
  )
}
