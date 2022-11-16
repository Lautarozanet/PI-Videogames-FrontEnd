import React from "react";
import {Link} from "react-router-dom";
import {getDetail} from "../actions/index"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import imgnotfound from "../img/imgnotfound.jpg"
import LoaderHome from "../components/LoaderHome";
import "../Css/GameDetail.css";

export default function GameDetail(props){
    // console.log("esto es props:" + props.match.params.id)
    const id=props.match.params.id
    const dispatch = useDispatch()
   

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])

    const gDetail = useSelector((state)=>state.detail)
    console.log("esto es gdetail:")
    console.log(gDetail)

    return(
        <div>
            {
                gDetail ? 
                    <div>
                        <h1 className="white1">{gDetail.name}</h1>
                        <img
                        src={gDetail.background_image ? gDetail.background_image : imgnotfound}
                        alt="" width="350px" height="400px"
                        />
                        <div>
                        <h4 className="white">⭐ Rating : </h4>
                        <p className="white2">{gDetail.rating}</p>

                        <h4 className="white" >📆 Fecha de Lanzamiento : </h4>
                        <p className="white2" >{gDetail.released}</p>

                        <h4 className="white">🎮 Plataformas : </h4>
                        <p className="white2">{gDetail && gDetail.platforms + " "}</p>

                        <h4 className="white">⚔ Generos : </h4>
                        <p className="white2">{gDetail && gDetail.genres + " "}</p>

                        <div className="divDescript">
                            <h4 className="white2">📜 Descripción :</h4>
                            <p className="descript">{gDetail.description}</p>
                        </div>
                        
                    </div>
                    </div>
                 : <LoaderHome />
            }
            <Link to="/home">
                <button className="Butback">
                <span></span>
                <span></span>
                <span></span>
                <span></span>Go back
                </button>
            </Link>

        </div>
    )
}
