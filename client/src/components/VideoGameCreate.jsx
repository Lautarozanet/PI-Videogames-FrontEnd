/* eslint-disable no-useless-escape */
import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postVideogames, getGenres} from "../actions/index"
import { useDispatch, useSelector } from "react-redux";
import "../Css/VideoGameCreate.css"


function validate(input){
    let regexURL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    let expreg = /[.*+\-?^${}()|[\]\\]/;
    let regex_formatDate = /^((19|20)\d\d)[- /.](([1-9]|[0][1-9]|1[012]))[- /.](([1-9]|[0][1-9]|1[012])|([12][0-9]|3[01]))$/;
    let error = {};
    if(!input.name || input.name?.trim() >= 1 ) {
        error.name = "Name your game !";    
      }else if((expreg.test(input.name))){
        error.name = "Name your game properly!"
      }
      else if((expreg.test(input.description))){
        error.description = "Description must be in a valid format!"
        }
      else if(!input.description || input.description?.trim().length <= 1) {
        error.description = "Description must be present.";
        }
        else if(!(regex_formatDate.test(input.releaseDate))) {
            error.releaseDate = "Release Date must be: YYYY/MM/DD format!";
        } 
        else if(!input.rating || input.rating === parseInt("0") || input.rating === '' ||
            input.rating < parseFloat("0.1") || input.rating >= parseFloat("5.1") || !Number(input.rating) ) {
        error.rating = "Rating must be a number from 0.1 to 5.0 !"
        }
        else if(!(regexURL.test(input.background_image))) {
        error.background_image = "Background image will be replaced if it's empty!";
        }
        else if(!input.platforms[0]) {
        error.platforms = "Platforms are required !";
        }
        else if(!input.genres[0]) {
        error.genres = "Select at least one Genre!";
        }
    
        return error;
      
}   

export default function VideoGameCreate(){
    const dispatch= useDispatch()
    const history= useHistory()
    const genres = useSelector((state)=>state.genres)
    const [errors, setErrors] = useState({});
    // console.log(genres)
    const platforms=  [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        " SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
      ];

    const [input, setInput]= useState({
        name:"",
        description:"",
        releaseDate:"",
        rating:"0",
        background_image: "",
        genres:[],
        platforms:[]
    })

    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);
 

      function handleDelete(e){
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter((gen) => gen !== e.target.value),
            platforms: input.platforms.filter((pt) => pt !== e.target.value),
        });
    };

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log("Soy INPUT >>> ", input);
        // Validacion de input:
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

function handleCheckPlatform(e){
    let plaformSelected = e.target.value
    console.log(e.target.value)
    let allPlatforms = [plaformSelected];
    if(allPlatforms.includes(e.target.value)){
        // alert('Please don`t repeat videogames Genres')
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])],
        })
    } else {
        // console.log(e.target.checked)
        setInput({
            ...input,
            platforms: input.platforms.filter((e) => e !== plaformSelected)
        })   
    }
   
}
function handleSubmit(e){
    e.preventDefault();
    let regexURL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if(!input.background_image || !(regexURL.test(input.background_image)) ) {
        input.background_image = "https://search.brave.com/images?q=img+not+found+img&img=3";
    }
    setErrors(
        validate({
            ...input,
            [e.target.name]: e.target.value,
        })
    );

    if(Object.keys(errors).length === 0) {
        dispatch(postVideogames(input));
        alert("Game created successfully!");
        setInput({
            name: '',
            background_image: '',
            rating: '',
            releaseDate: '',
            description: '',
            genres: [],
            platforms: [],
        });
        setTimeout(() => {
            history.push("/home");
          }, 2000);
    }else{
        alert("Error: Game was not created!");
        return;
    }
};

function handleSelectGenres(e){//cambiar para poder iterar sobre el array genres
    let selection = e.target.value
    console.log(e.target.value)
    let allSelections = [selection];
    if(allSelections.includes(e.target.value)){
        // alert('Please don`t repeat videogames Genres')
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])],
        })
    } else {
        // console.log(e.target.checked)
        setInput({
            ...input,
            genres: input.genres.filter((e) => e !== selection)
        })   
    }
   
}
let id = 0
function addKey(){
    return id++
}

    return(
        <div className="Fondo-Form">
            <Link to= "/home"><button className="goBack">Go Back</button></Link>
            <h1 className="CreateGame">Create your own Videogame!</h1>
            <form  className="Contenedor-Form" onSubmit={(e)=>handleSubmit(e)}>
                <div className="divCreate">
                    <label>Name:</label>
                    <div>
                    <input
                    autoFocus
                    className="input"
                    placeholder="Type here..."
                    type= "text"
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleChange(e)}
                    ></input>{
                        errors.name && (
                            <p className='error'>   {errors.name}   </p>
                        )
                    }</div>
                </div>
                <div className="divCreate">
                    <label>Description:</label>
                    <input
                    className="input"
                    placeholder="Breif resume about the game..."
                    type= "text"
                    key='description'
                    value={input.description}
                    name="description"
                    onChange={(e)=>handleChange(e)}
                    ></input>{
                        errors.description && (
                            <p className='error'>   {errors.description}  </p>
                        )
                    }
                </div>
                <div className="divCreate">
                    <label>ReleaseDate:</label>
                    <input
                    className="input"
                    type= "date"
                    min='2018-12-31'  max='2022-12-31'
                    value={input.releaseDate}
                    name="releaseDate"
                    onChange={(e)=>handleChange(e)}
                    ></input>{
                        errors.releaseDate && (
                            <p className='error'>   {errors.releaseDate}  </p>
                        )
                    }
                </div>
                <div className="divCreate">
                    <label>Rating:</label>
                    <input
                    className="input"
                    type= "number"
                    min="0" max="5"
                    placeholder="Numbers 1 to 5 max."
                    value={input.rating}
                    name="rating"
                    onChange={(e)=>handleChange(e)}
                    ></input> {
                        errors.rating && (
                            <p className='error'>   {errors.rating}  </p>
                        )
                    }
                </div>
                <div className="divCreate">
                    <label>Image:</label>
                    <input
                    className="input"
                    type= "text"
                    placeholder=" Url de imagen..."
                    value={input.background_image}
                    name="background_image"
                    onChange={(e)=>handleChange(e)}
                    ></input>{
                        errors.background_image && (
                            <p className='error'>   {errors.background_image}   </p>
                        )
                    }
                </div>
                <div className="divCreate">
                <label>Genres:</label>
                <select onChange={(e)=>handleSelectGenres(e)}>
                    {genres.map((e)=>(
                        <option value={e.name} key={e}>{e}</option>
                    ))}
                </select>
                {
                                errors.genres && (
                                    <p className='error'>   {errors.genres}  </p>
                                )
                            }
                </div>
                <div >
                        <p><b>Genres Selected:</b></p> <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='buttons'>
                            {input.genres.map(gen => (
                                    <div key={addKey()}>
                                        <button onClick={handleDelete} className='btn-create' value={gen}>
                                            {gen}
                                        </button>
                                    </div>
                                ))
                            }
                    </div>  <br />
                    </div>  <br />
                            <hr /> <br />
                            
                <div className="divCreate">
                    <label>Platforms:</label>
                   <select onChange={(e)=>handleCheckPlatform(e)}>
                   {platforms.map((e) => (
                   <option value={e.name} key={e}>{e}</option>
                    ))}
                   </select>
                   {
                                errors.platforms && (
                                    <p className='error'>   {errors.platforms}  </p>
                                )
                            }
                </div>
                
                
                    <div>
                        <p><b>Platforms Selected:</b></p> <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='buttons'>
                    
                            {input.platforms.map(p => (
                                <div key={addKey()}>
                                    <button onClick={handleDelete} className='btn-create' value={p}>
                                        {p}
                                    </button>
                                </div>
                                ))
                            }
                    </div>  <br />
                    </div>  <br />
                    <hr /> <br />
                <div className="DivCreateGame">
                <button className="buttonC">
                Create Game 🎮
                </button>
                </div>
            </form>  
        </div>
    )
}