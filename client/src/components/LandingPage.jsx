import React from "react";
import {Link} from "react-router-dom";
import "../Css/LandingPage.css"

export default function LandingPage(){
    return(
        <div>
            <h1 className="TittleLanding">Welcome to my first Videogame`s page</h1>
            <Link to="/home">
                <button className="butLets">Let`s go!</button>
            </Link>
        </div>
    )
}