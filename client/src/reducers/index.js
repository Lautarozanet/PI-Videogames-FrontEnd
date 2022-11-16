const initialState = {
    videogames :[],
    genres: [],
    allGames:[],
    detail:[],
    videogamesCopy:[],
    searchVideogameCopy:[],
    searchVideogame:[],
}

function rootReducer (state= initialState, action){
    switch(action.type){
    case "GET_VIDEOGAMES":  
            return{
                ...state,
                videogames: action.payload,
                allGames: action.payload,
            };
    case "GET_NAME_VIDEOGAMES":
        return{
            ...state,
            videogames: action.payload
        }
    case "GET_GENRES":
                return {
                    ...state,
                    genres: action.payload
                };
    case "ALL_PLATFORMS":
            return {
                ...state,
                platforms : action.payload,
            }
    case "FILTER_BY_GENRES":
                const allGames = state.allGames
                const genreFiltered = action.payload === "All" ? allGames : allGames.filter(e => e.genres.includes(action.payload));
                return {
                  ...state,
                  videogames: genreFiltered
                };
    case "POST_VIDEOGAMES":
        return{
            ...state,
        }
    case "FILTER_CREATED":
                const allDbGames = state.allGames
                console.log(allDbGames)
                    const vGamesCreated= action.payload === "db" ? allDbGames.filter(el=> typeof el.id === "string" ) : allDbGames;
                return{
                    ...state,
                    videogames: action.payload === "All" ? state.allGames : vGamesCreated
                }
    case "ORDER_BY_NAME":
        let sortedArr= action.payload ==="up"?
        state.videogames.sort(function(a,b){
            if(a.name>b.name){
                return 1;
            }
            if(b.name>a.name){
                return -1;
            }
            return 0;
        }):
        state.videogames.sort(function(a,b){
            if(a.name> b.name){
                return -1;
            }
            if(b.name>a.name){
                return 1;
            }
            return 0
        })
        return {
            ...state,
            videogames: sortedArr
        }
        case "GET_DETAILS":

            return{
                ...state,
                detail: action.payload
            }
        case "ORDER_BY_RATING":
            const orderGamesRating =
                action.payload === "Min-Max"
                ? state.videogames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                    })
                : state.videogames.sort((a, b) => {
                    if (a.rating > b.rating) {
                         return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                    });
                return {
                  ...state,
                  videogames: orderGamesRating,
                };
        
            default:
                return state;
    }
    


}
export default rootReducer;