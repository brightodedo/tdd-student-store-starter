import * as React from "react"
import "./Search.css"

export default function Search(props){
    return(
        <div className="search">
            <form action="">
                <input type="text" placeholder="Search" value={props.searchValue} onChange={props.handleSearchTextChange} className="inputField"/>
            </form>
            <div className="btns">
                <button onClick={(event) => {event.preventDefault(); props.handleSetProduct("all",2)}}> All Categories </button>
                <button onClick={(event) => {event.preventDefault(); props.handleSetProduct("clothing",2)}}> Clothing </button>
                <button onClick={(event) => {event.preventDefault(); props.handleSetProduct("food",2)}}> Food </button>
                <button onClick={(event) => {event.preventDefault(); props.handleSetProduct("accessories",2)}}> Accessories </button>
                <button onClick={(event) => {event.preventDefault(); props.handleSetProduct("tech",2)}}> Tech </button>
            </div>
        </div>
    )
}