import React from "react";
import imgnotfound from "../img/imgnotfound.jpg"
import "../Css/GameCard.css"

export default function GameCard({background_image, name, genres, rating}){
    return(
        
        <div className="Card">
            <h3 className="Nombre">🕹️{name}</h3>
            <img className="Imagen" src={background_image ? background_image :imgnotfound} alt="img not found" width="150px" height="100px"/>
            <h5 className="Generos">🔹Genres :{genres.join(",  ")}</h5>
            <h5 className="Raiting">Rating :{rating}</h5>
        </div>
        
    );
}