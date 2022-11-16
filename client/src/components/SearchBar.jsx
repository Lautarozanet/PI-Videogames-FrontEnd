import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import "../Css/SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

   function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
   }   
    
   function handleSubmit(e){
    e.preventDefault()
    if(!name){ return alert("Come on! search whatever game you like!")
        } else {
        dispatch(getNameVideogames(name))
        setName('')
        document.getElementById("search").value='';}
   }

    return (
        <div className="ContenedorSearchBar">
            <input className="InputSearchBar" id="search" type ="text" placeholder="Search..." onChange={(e)=>handleInputChange(e)}/>
            <button className= "butSearch" type="submit" onClick={(e)=>handleSubmit(e)}>🔎Search!</button>
        </div>
    )
}