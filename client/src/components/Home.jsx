/* eslint-disable no-unused-vars */
import React, {Fragment} from "react";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link} from "react-router-dom"
import {filterVideoGamesByGenres,getVideogames,getGenres,filterVGameCreated, orderByName, orderByRating} from "../actions";
import GameCard from "./GameCard";
import Paginado from "./Paginate";
import SearchBar from "./SearchBar";
import LoaderHome from "../components/LoaderHome";
import "../Css/Home.css";

export default function Home(){

    const dispatch= useDispatch()
    const allVideogames = useSelector((state)=> state.videogames)//con use selector traigo y guardo en la const allvideoames el state de videogames
    const allGenres = useSelector((state) => state.genres);
    const [order, setOrder]= useState('');
    const [currentPage, setCurrentPage]= useState(1);//seteo mi estado local inicial en la pagina 1 
    const [videogamesPerPage,setVideogamesPerPage]=useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage//15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage//0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)



    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    // useEffect(()=>{
    //     dispatch(getVideogames());
    // },[dispatch])

    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);
    
      if (allVideogames?.length <= 0) {
        dispatch(getVideogames());
        return <LoaderHome />;
        }
 
    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames(e));
        setCurrentPage(1);
        document.getElementById("search").value='';

    }
    function handleSort(e){
        e.preventDefault();
        setCurrentPage(1);
        setOrder(e.target.value);
        dispatch(orderByName(e.target.value));
    };

    function handleFilterVideoGamesByGenres(e) {
        e.preventDefault();
        setCurrentPage(1);
        setOrder(e.target.value);
        dispatch(filterVideoGamesByGenres(e.target.value));
      }

    function handleSortRating(e) {
        e.preventDefault();
        setCurrentPage(1);
        setOrder(e.target.value);
        dispatch(orderByRating(e.target.value));
      }

    function handlefilterVGameCreated(e){
        e.preventDefault();
        setCurrentPage(1);
        setOrder(e.target.value);   
        dispatch(filterVGameCreated(e.target.value));
    }
    
    return (
        <div className="HomeF">
            <h1 className="Tittle">Choose your Game!</h1>
            <div> <Link to= "/videogame"><button className="BtnCreate">Create Videogame</button></Link></div>

            <button className="ReloadVideo" onClick={e=>{handleClick(e)}}>
                Reload all the Videogames
            </button>
            <div>
                <select className="Selector" onChange={(e) => handleSort(e)}>
                    <option className="up" value= "up">A-Z</option>
                    <option value= "down">Z-A</option>
                </select>
                <select className="Selector"
                onChange={e=>handleFilterVideoGamesByGenres(e)}>
                {/* <option value="genres" key="genres">Genres</option> */}
                <option value="All">All Genres</option>
                {allGenres.map((g) => (<option key={g} value={g}>{g}</option>))}
                </select>
                    <label>Rating</label>
                    <select className="Selector" onChange={(e) => handleSortRating(e)}>
                    <option value="Max-Min">
                        Max to Min
                    </option>
                    <option value="Min-Max">
                        Min to Max
                    </option>
                    </select>
                <select className="Selector" onChange={e=>handlefilterVGameCreated(e)}>
                    <option value="All">All</option>
                    <option value="db">Created</option>
                    <option value="Existing">Existing</option>
                </select>
                <SearchBar id="search"/>
                <Paginado 
                value={currentPage}
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado= {paginado}/>
                <div className="Card1">
                {
                    currentVideogames?.map((el) => {
                        // console.log(el.id)
                        return(
                            <Fragment key={el.id}>
                                <Link to={"/home/"+ el.id} >
                                <GameCard name={el.name} rating={el.rating} createdInDb={el.createdInDb} background_image={el.background_image} genres={el.genres} key={el.id}/>
                                </Link>  
                            </Fragment>  
                        )       
                    })
                }
                </div>
                <Paginado 
                value={currentPage}
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado= {paginado}/>
            </div>
        </div>
        
    )   

}
