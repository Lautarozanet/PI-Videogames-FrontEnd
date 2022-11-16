import React from "react";
import "../Css/Paginate.css";

export default function Paginado({videogamesPerPage, allVideogames, paginado,value}){
    const pageNumbers=[]

    for (let i=1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>   
            <ul >
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="Paginate" key={number}>
                        <button className={number === value? "actual" : "ButPaginate"} onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}