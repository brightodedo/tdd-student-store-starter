import * as React from "react"
import "./Hero.css"
import imgSrc from "../../assests/hat.png"

export function Hero (){
    return(
        <div className="hero">
            <div className="welcome-text">
                <p className="intro">Welcome!</p>
                <p className="following-text"> 50% off for father's day sale </p>
            </div>
            <div className="welcome-image">
            <img src={imgSrc} alt="" className="hero-img"/>
            </div>
        </div>
    )
}

export default Hero