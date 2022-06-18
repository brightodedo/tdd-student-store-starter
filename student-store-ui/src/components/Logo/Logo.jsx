import * as React from "react"
import * as Rrd from "react-router-dom"
import './Logo.css'
import imgSrc from "../../assests/codepath.svg"

export default function Logo(){
    return(
        <div className="logo">
            <Rrd.Link to='/'><img src={imgSrc} alt="codepath Logo" /></Rrd.Link>
        </div>
    )
}