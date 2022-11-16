import axios from "axios";

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("/videogames",{
});
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}
export function getNameVideogames(name){
    return async function(dispatch){
        try {
            var json = await axios.get("/videogames?name=" + name);
            return dispatch({
                type: "GET_NAME_VIDEOGAMES",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        const info = await axios.get(`/genres`,{
});
        return dispatch({
            type: 'GET_GENRES',
            payload: info.data
        })
    }
};

export function postVideogames(payload){
    return async function(dispatch){
        const response = await axios.post(`/videogames`,payload);
        console.log(response)
        return dispatch({
            type: 'POST_VIDEOGAMES',
            response
        })
    }

}

export function filterVideoGamesByGenres(payload){
    console.log(payload)
    return({
        type: 'FILTER_BY_GENRES',
        payload
    })
};

export function orderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload
    }
}

export function filterVGameCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}
export function orderByRating (payload){
    return({
        type: 'ORDER_BY_RATING',
        payload
    })
};

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogame/${id}`);
            console.log("esto es json data",json.data)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

